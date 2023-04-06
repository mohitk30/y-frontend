import React, { useEffect,useState } from 'react'
import { toast } from 'react-toastify';
import { addContact,allContacts,deleteContact ,updateContact,deleteMultipleContact} from '../../services';
import './dashboard.css'
import { Checkbox } from 'antd';

const Dashboard=()=>{
    const [contactName,setContactName]=useState('');
    const [contactNumber,setContactNumber]=useState('');
    const [isUpdating,setIsUpdating]=useState(0)
    const [contactList,setContactList]= useState([])
    const [updateContactName,setUpdateContactName]=useState('');
    const [updateContactNumber,setUpdateContactNumber]=useState('');
    const [deleteList,setDeleteList]=useState('');

    

     useEffect(()=>{
        getAllContacts();
     },[])

     const addIdToDeleteList=(id)=>{
        setDeleteList((pre)=>{
            return [...pre,id]
        })
        
         
     }
     const deleteMultipleContacts= async ()=>{
        console.log(deleteList)
        
        const deleteMultipleResult= await deleteMultipleContact(deleteList) ;

        const result= deleteMultipleResult?.data?.status;

        if( result==='200'){
            toast.success("Selected contacts deleted");
            getAllContacts();
        }else{
            toast.error("Something went wrong");
        }



     }
     
     const getAllContacts= async ()=>{
          const result=await allContacts();

          const contacts=result?.data?.contacts;
          setContactList((pre)=>{
            return [...contacts]
          })

     }

      const handelAddContact= async () =>{
        if( contactName ==='' ){
            toast.error("Name is required");
            return;
         }
         if( contactNumber ==='' ){
            toast.error("Contact Number is required");
            return;
         }
         
        const result=await addContact(
            {
                contactName:contactName,
                contactNumber:contactNumber
            }
        );
        if( result?.data?.status==='200'){
            toast.success(result?.data?.message)
            setContactName('');
            setContactNumber('');
            getAllContacts();

         }else{
            toast.error(result?.data?.message);
         }


      }
      const handelDeleteContact=async (contactId)=>{

        const result=await deleteContact({id:contactId});
        if( result?.data?.status==='200'){
            toast.success(result?.data?.message)
            getAllContacts();
           
         }else{
            toast.error(result?.data?.message);
         }    
      }

      const handelUpdateClick=(contact)=>{
        setIsUpdating(contact._id);
        setUpdateContactName((pre)=>{
            return contact.contactName;
        })
        setUpdateContactNumber((pre)=>{
            return contact.contactNumber;
        })
      }
      const handelUpdateContact= async (id)=>{
        if( updateContactName ==='' ){
            toast.error("Name is required");
            return;
         }
         if( updateContactNumber ==='' ){
            toast.error("Contact Number is required");
            return;
         }

         const result=await updateContact(
            {
                id:id,
                contactName:updateContactName,
                contactNumber:updateContactNumber
            }
         );
         if( result?.data?.status==='200'){
            toast.success(result?.data?.message)
            getAllContacts();

           setUpdateContactNumber('')
           setUpdateContactName('');
           setIsUpdating(0);

         }else{
            toast.error(result?.data?.message);
         }    


      }

      const logoutHandler=()=>{
        localStorage.removeItem("6f0bb1e57b8223a94ededf83ad6e1e40");
        window.location.reload(false);
      }
    

     return(
        <>
            
            <div className='appHeader font-bold flex '>Contact Manager 
            <div className='buttonDiv  mx-auto mr-2'>
                    <button className='buttonYellow' onClick={logoutHandler} >LogOut</button>
                </div>
            </div>
            <div className='px-5'>
                <div>Add Contact</div>
                <div className='mb-2 w-[80%] '>

                        <input className='inputsBlock' value={contactName} placeholder='Contact Name..' onChange={(e)=>setContactName(e.target.value)} />
                        <input className='inputsBlock' value={contactNumber}  placeholder='Contact Number..' onChange={(e)=>setContactNumber(e.target.value)} />
                        <div className='buttonDiv'>
                            <button className='buttonYellow' onClick={handelAddContact} >Add Contact</button>
                        </div>
                </div>

            </div>
            <button className='buttonYellow mx-5' onClick={deleteMultipleContacts} >Delete Multiple Contact</button>
            <div className='px-5'>Your all contacts are listed below:</div>
             <div className='px-5 pt-3'>
                {
                    contactList.map((contact,index)=>{
                        return <div key={index+100} className='contact_block'>
                            <input type='checkbox' onClick={()=> addIdToDeleteList(contact._id)} ></input>
                            <div><span className='font-bold'>Contact Name: </span> {contact.contactName}</div>
                            <div><span className='font-bold'>Contact Number: </span> {contact.contactNumber}</div>
                            {
                                (isUpdating!==contact._id) &&
                                <div className='flex '>
                                    <div className='buttonDiv mr-2'>
                                        <button className='buttonYellow' onClick={(() => handelUpdateClick(contact))} >Update Contact</button>
                                    </div>
                                    <div className='buttonDiv mr-2'>
                                        <button className='buttonYellow' onClick={(() => handelDeleteContact(contact._id))} >Delete Contact</button>
                                    </div>
                                
                               </div>
                            }
                            <div>
                                {
                                    (isUpdating===contact._id) && 
                                    <div>
                                        <div className='mb-2 w-[80%] '>

                                            <input className='inputsBlock' value={updateContactName} placeholder='Contact Name..' onChange={(e)=>setUpdateContactName(e.target.value)} />
                                            <input className='inputsBlock' value={updateContactNumber}  placeholder='Contact Number..' onChange={(e)=>setUpdateContactNumber(e.target.value)} />
                                            <div className='buttonDiv'>
                                                <button className='buttonYellow' onClick={(() => handelUpdateContact(contact._id))} >Update Contact</button>
                                            </div>
                                            </div>


                                    </div>
                                }
                            </div>
                        </div>
                    })
                }
                {contactList.length === 0 ?'No Contact. Try adding Contacts.':''}
             </div>
        
        </>
     )
}
export default Dashboard;