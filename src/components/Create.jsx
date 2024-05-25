import React, { useEffect, useState } from 'react';
import db, { storage } from "../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';

const Create = () => {
    const [fName, setFName] = useState("");
    const [fEmail, setFEmail] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        if (!id) {
            setIsEdit(false);
        }
        else {
            setIsEdit(true);
        }
    },[])

    // Function for handling image upload
    const handleUpload = async (e) => {
        let file = e.target.files[0];
        console.log(file);
        setIsLoading(true);
        try {
            let imageRef = ref(storage, `images/${file.name}`);
            await uploadBytesResumable(imageRef, file);
            const url = await getDownloadURL(imageRef);
            console.log(url);
            setFileUrl(url);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }

    // Handling the user's data
    const handleAdd = async (e) => {
        e.preventDefault();
        if (!fileUrl) {
            console.log('File is still uploading or not uploaded.');
            return;
        }
        let data = {
            _id: new Date().getUTCMilliseconds(),
            fName: fName,
            fEmail: fEmail,
            fileUrl: fileUrl,
            created: Timestamp.now(),
        };
        const useCollectionRef = collection(db, "users");
        console.log(useCollectionRef);

        try {
            await addDoc(useCollectionRef, data);
            setFName("");
            setFEmail("");
            setFileUrl("");
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='w-50 mx-auto'>
            <h2>{isEdit ? "Update a card" : "Add a card"} a Card</h2>
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
                    <label htmlFor="image">Add Cards</label>
                    <input
                        type="file"
                        name='image'
                        onChange={handleUpload}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Create;
