import React, { useEffect, useState } from 'react';
import db, { storage } from "../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Timestamp, addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';

const Create = () => {
    const [fName, setFName] = useState("");
    const [fEmail, setFEmail] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        if (!id) {
            setIsEdit(false);
            setFName("");
            setFEmail("");
            setFileUrl("");
        }
        else {
            setIsEdit(true);
            fetchSingleData();
        }
    }, [id])

    const fetchSingleData = async () => {
        try {
            const docRef = doc(db, "users", id);
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data());
            // if(docSnap.exists()){
            //     const userData = docSnap.data();
            //     setFName(userData.fName);
            //     setFEmail(userData.fEmail);
            //     setFileUrl(userData.fileUrl);
            // }
            setFName(docSnap.data().fName);
            setFEmail(docSnap.data().fEmail);
            setFileUrl(docSnap.data().fileUrl);
        } catch (err) {
            console.log(err);
        }
    }

    // Function for handling image upload
    const handleUpload = async (e) => {
        let file = e.target.files[0];
        setIsLoading(true);
        try {
            let imageRef = ref(storage, `images/${file.name}`);
            await uploadBytesResumable(imageRef, file);
            const url = await getDownloadURL(imageRef);
            console.log(url);
            setFileUrl(url);
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    }

    // Handling the user's data
    const handleAdd = async (e) => {
        e.preventDefault();
        let data = {
            _id: new Date().getUTCMilliseconds(),
            fName: fName,
            fEmail: fEmail,
            fileUrl: fileUrl,
            created: Timestamp.now(),
        };
        const useCollectionRef = collection(db, "users");
        try {
            await addDoc(useCollectionRef, data);
            setFName("");
            setFEmail("");
            setFileUrl("");

            navigate("/read");
        } catch (err) {
            console.log(err);
        }
    };
    // For edit function 
    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            // const docRef = doc(db, "users", id)
            await updateDoc(doc(db, "users", id), {
                fName: fName,
                fEmail: fEmail,
                fileUrl: fileUrl,
            });
            setFEmail("");
            setFName("");
            setFileUrl("");
            navigate("/");
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='w-50 mx-auto'>
            <h2>{isEdit ? "Update a card" : "Add a card"}</h2>
            {isLoading && (
                <div className="alert alert-primary" role='alert'>
                    Wait, file is uploading
                </div>
            )}
            <form onSubmit={handleAdd}>
                <div className="mb-3">
                    <label htmlFor="name">Enter Name</label>
                    <input
                        type="text"
                        name='name'
                        value={fName}
                        onChange={(e) => setFName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="text"
                        name='email'
                        value={fEmail}
                        onChange={(e) => setFEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="image">Add Image</label>
                    {fileUrl && (
                        <div>
                            <img src={fileUrl} alt={fName} className='m-2 rounded' width={500} />
                        </div>
                    )}
                    <input
                        type="file"
                        name='image'
                        onChange={(e) => handleUpload(e)}
                    />
                </div>

                {isEdit ? (
                    <button
                        type="submit"
                        className={`btn btn-secondary ${isLoading ? "disabled" : ""}`}
                        onClick={handleEdit}
                    > Update
                    </button>)
                    : (
                        <button
                            type="submit"
                            className={`btn btn-secondary ${isLoading ? "disabled" : ""}`}
                            onClick={handleAdd}
                        >
                            ADD
                        </button>
                    )
                }
            </form>
        </div>
    );
}

export default Create;

