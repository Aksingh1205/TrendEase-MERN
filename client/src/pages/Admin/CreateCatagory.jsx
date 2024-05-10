import React,{useEffect, useState} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import  toast  from 'react-hot-toast';
import  axios from 'axios';
import CatagoryForm from './../../components/Form/CatagoryForm';
import { Modal } from 'antd';

const CreateCatagory = () => {

  const [catagories, setCatagories] = useState([])
  const [name, setName] = useState("")
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updatedName, setUpdatedName] = useState("")

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/catagory/create-catagory", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong in input form");
    }
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/catagory/get-catagory");
      if (data?.success) {
        setCatagories(data?.catagory);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting catagory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update catagory
  const handleUpdate = async(e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`/api/v1/catagory/update-catagory/${selected._id}`, {name : updatedName});
      if(data.success){
        toast.success(`${updatedName} is updated`)
        setSelected(null)
        setUpdatedName("")
        setVisible(false)
        getAllCategory()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong')
    }
  }

  //delete catagory
  const handleDelete = async(id) => {
    try {
      const { data } = await axios.delete(`/api/v1/catagory/delete-catagory/${id}`);
      if(data.success){
        toast.success(`catagory is deleted`)
        getAllCategory()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong')
    }
  }
  return (
    <Layout title={'Create Catagory'}
      text={
        <>
        <div className='container-fluid m-3 p-3'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu/>
            </div>
            <div className='col-md-9'>
              <h1>Manage Catagory</h1>
              <div className='p-3 w-50'>
              <CatagoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
              </div>
              <div className='w-75'>
              <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                      {catagories?.map((c) => (
                          <>
                          <tr>
                          <td key={c._id}>{c.name}</td>
                          <td>
                            <button className='btn btn-primary ms-2' 
                            onClick={() => {setVisible(true); setUpdatedName(c.name); setSelected(c)}}>Edit</button>
                            <button className='btn btn-danger ms-2' onClick={() => {handleDelete(c._id)}}>Delete</button>
                          </td>
                          </tr>
                          </>
                        ))}
                  </tbody>
                </table>
              </div>
              <Modal onCancel={() => setVisible(false)} footer = {null} open = {visible}>
                <CatagoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
              </Modal>
            </div>
          </div>
          </div>
        </>

      }
    />
  )
}

export default CreateCatagory