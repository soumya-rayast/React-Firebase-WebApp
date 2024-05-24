import React, { useState ,useEffect } from 'react'
import db ,{ storage } from "../firebase/firebaseConfig"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Timestamp, addDoc, collection ,getDoc,updateDoc } from 'firebase/firestore';
import { useNavigate,useParams } from 'react-router-dom';
const Create = () => {
    const [fName,setFName] = useState("");
    const [fEmail, setFEmail] = useState("");
    const [fileUrl, setFileUrl] = useState("");

    const navigate = useNavigate();

    // function for handling image upload
    const handleUpload = async (e) => {

        let file = e.target.files[0];
        console.log(file)
        try {
            let imageRef = ref(storage, `images/${file.name}`);
            await uploadBytesResumable(imageRef, file);
            const url = await getDownloadURL(imageRef);
            console.log(url);
            setFileUrl(url);
        } catch (err) {
            console.log(err);
        }
    }

    // handling the users data 
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
        console.log(useCollectionRef);

        try {
            await addDoc(useCollectionRef, data);
            setFName("");
            setFEmail("");
            setFileUrl("")
            navigate("/");
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className='w-50 mx-auto'>
            <h2>Add a Card</h2>
            <form > 
                <div className="mb-3">
                    <label
                        htmlFor="name">
                        Enter Name
                    </label>
                    <input type="text"
                        name='name'
                        value={fName}
                        onChange={(e) => setFName(e.target.value)} />
                </div>


                <div className="mb-3">
                    <label
                        htmlFor="email">
                        Email Address
                    </label>
                    <input type="text"
                        name='email'
                        value={fEmail}
                        onChange={(e) => setFEmail(e.target.value)} />
                </div>


                <div className="mb-3">
                    <label
                        htmlFor="image">
                        Add Cards
                    </label>
                    <input
                        type="file"
                        name='image'
                        value={fileUrl}
                        onChange={handleUpload} />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleAdd}
                    >       
                    Submit
                </button>

            </form>
        </div>
    )
}

export default Create

// import React, { useState } from 'react';
// import db, { storage } from "../firebase/firebaseConfig";
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import { Timestamp, addDoc, collection } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';

// const Create = () => {
//     const [fName, setFName] = useState('');
//     const [fEmail, setFEmail] = useState('');
//     const [fileUrl, setFileUrl] = useState('');

//     const navigate = useNavigate();

//     // Function for handling image upload
//     const handleUpload = async (e) => {
//         let file = e.target.files[0];
//         console.log(file);
//         try {
//             let imageRef = ref(storage, `images/${file.name}`);
//             await uploadBytesResumable(imageRef, file);
//             const url = await getDownloadURL(imageRef);
//             console.log(url);
//             setFileUrl(url);
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     // Handling the user's data
//     const handleAdd = async (e) => {
//         e.preventDefault();  // Prevent the default form submission behavior
//         if (!fName || !fEmail || !fileUrl) {
//             console.log('One or more fields are empty.');
//             return;
//         }

//         let data = {
//             _id: new Date().getUTCMilliseconds(),
//             fName: fName,
//             fEmail: fEmail,
//             fileUrl: fileUrl,
//             created: Timestamp.now(),
//         };

//         const usersCollectionRef = collection(db, "users");

//         try {
//             await addDoc(usersCollectionRef, data);
//             setFName("");
//             setFEmail("");
//             setFileUrl("");
//             navigate("/");
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     return (
//         <div className='w-50 mx-auto'>
//             <h2>Add a Card</h2>
//             <form> 
//                 <div className="mb-3">
//                     <label htmlFor="name">Enter Name</label>
//                     <input 
//                         type="text"
//                         name='name'
//                         value={fName}
//                         onChange={(e) => setFName(e.target.value)} 
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <label htmlFor="email">Email Address</label>
//                     <input 
//                         type="text"
//                         name='email'
//                         value={fEmail}
//                         onChange={(e) => setFEmail(e.target.value)} 
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <label htmlFor="image">Add Cards</label>
//                     <input 
//                         type="file"
//                         name='image'
//                         onChange={handleUpload} 
//                     />
//                 </div>

//                 <button 
//                     type="submit" 
//                     className="btn btn-primary"
//                     onClick={handleAdd}
//                 >
//                     Submit
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Create;
