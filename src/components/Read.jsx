import { useEffect, useState } from 'react'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import db from "../firebase/firebaseConfig"
import { Link } from 'react-router-dom'

const Read = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const user_data = snapshot.docs.map((doc) => {
        console.log(doc.data());
        return { ...doc.data(), id: doc.id };
      })
      setUserData(user_data)
    } catch (err) {
      console.log(err);
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      await deleteDoc(doc(db, "users", id));
      setUserData(userData.filter(user => user.id !==id))
      // fetchData();
    } catch (err) {
      console.log(err);
    }finally
    {setIsLoading(false);}
  };

  return (
    <div className="container my-5">
      {isLoading && (
        <div className="alert alert-danger" role='alert'>
          Loading
        </div>
      )}
      <div className="row">
        {userData.length <= 0 ? (<h2>No data found</h2>) :
          (userData.map((user) => (
            <div className="col" key={user.id}>
              <div className="card">
                <img
                  src={user.fileUrl}
                  alt={user.fName}
                  className="img-thumbnail rounded m-auto"
                  style={{ width: '200px', height: "200px", objectFit: "cover" }} />

                <div className="card-body">
                  <span>Date - {user.created.toDate().toDateString()}</span>
                  <h5 className='card-title'>
                    {user.fName}
                  </h5>
                  <p className='card-text'>
                    {user.fEmail}
                  </p>
                  <button
                    className='btn btn-danger mx-2'
                    onClick={() => handleDelete(user.id)}>
                    Delete
                  </button>
                  <Link to={`edit/${user.id}`}>
                    <button
                      className='btn btn-secondary'>
                      Edit
                    </button>
                  </Link>

                </div>
              </div>
            </div>)
          ))
        }
      </div >
    </div >
  )
}

export default Read
