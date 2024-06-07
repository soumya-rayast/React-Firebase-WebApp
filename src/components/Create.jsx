import { useEffect, useState } from 'react';
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

    useEffect(() => {
        if (id) {
            fetchSingleData();
            setIsEdit(true);
        }
        else {
            restForm();
            setIsEdit(false);
        }
    }, [id])

    const fetchSingleData = async () => {
        try {
            const docRef = doc(db, "users", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setFName(data.fName);
                setFEmail(data.fEmail);
                setFileUrl(data.fileUrl);
            } else {
                console.log("No such Document")
            }
        } catch (err) {
            console.log(err);
        }
    }

    const restForm = () => {
        setFName("");
        setFEmail("");
        setFileUrl("");
    };

    // Function for handling image upload
    const handleUpload = async (e) => {
        let file = e.target.files[0];
        if (file) {
            setIsLoading(true);
            try {
                let imageRef = ref(storage, `images/${file.name}`);
                await uploadBytesResumable(imageRef, file);
                const url = await getDownloadURL(imageRef);
                setFileUrl(url);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }
    }

    // Handling the user's data
    const handleAdd = async (e) => {
        e.preventDefault();
        let data = {
            // _id: new Date().getTime(),
            fName,
            fEmail,
            fileUrl,
            created: Timestamp.now(),
        };
        try {
            await addDoc(collection(db, "users"), data)
            restForm();
            navigate("/read");
        } catch (err) {
            console.log(err);
        }
    };
    // For edit function 
    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, "users", id)
            await updateDoc(docRef, {
                fName,
                fEmail,
                fileUrl,
            });
            restForm();
            navigate("/read");
        } catch (err) {
            console.log(err)
        }
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            handleEdit(e);
        } else {
            handleAdd(e);
        }
    };
    
    return (
        <div className='w-50 mx-auto'>
            <h2>{isEdit ? "Update a card" : "Add a card"}</h2>
            {isLoading && (
                <div className="alert alert-primary" role='alert'>
                    Wait, file is uploading
                </div>
            )}
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="name">Enter Name</label>
                    <input
                        type="text"
                        name='name'
                        value={fName}
                        onChange={(e) => setFName(e.target.value)
                        }
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
                            <img src={fileUrl} alt={fName} className='m-2 rounded' width={300}  height={300}/>
                        </div>
                    )}
                    <input
                        type="file"
                        name='image'
                        onChange={(e) => handleUpload(e)}
                    />
                </div>
                <button
                type='submit'
                className={`btn btn-secondary ${isLoading ? "disabled" :""}`}
                >
                    {isEdit ? "Update" :"Add"}
                </button>
            </form>
        </div>
    );
}

export default Create;

