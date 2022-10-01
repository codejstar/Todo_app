import React from 'react'
import { useState,useEffect } from 'react';
import cal from "../component/images/cal.svg";
import './Todo.css';

const getLoacalItems = () => {
        let list = localStorage.getItem('lists')
        // console.log(list)
        if (list) {
           return  JSON.parse(localStorage.getItem('lists'));
        }else{
            return [];
        }
}

const Todo = () => {
    const [Inputfield, setInputfield] = useState('');
    const [items,setItems] = useState(getLoacalItems());
    const [toggleBtn, setToggleBtn] = useState(true);
    const [isEditItem,setIsEditItem] = useState(null);
    
    const addItem = () => {
        if (!Inputfield) {
          alert('please fill the data');
        }else if (Inputfield  && !toggleBtn){
           setItems(
            items.map((elem) => {
             if(elem.id === isEditItem)
             {
               return {...elem,name:Inputfield}
             }
             return elem;
           })
           )
           setInputfield("");
           setToggleBtn(true);
           setIsEditItem(null)
        }else{
            const allInputData = {id: new Date().getTime().toString(), name:Inputfield}
            setItems([...items,allInputData])
            setInputfield('');
        }
    }
   
   //how to save our data in local storage 
    useEffect(() => {                                      //JSON.parse is use to concert a string ot array value
      localStorage.setItem('lists',JSON.stringify(items)) // first is 'key' and second is value
    }, [items])
    
    
    const delItem = (index) => {
         const updatedItem = items.filter((elem) => {
               return index !== elem.id
         });
         setItems(updatedItem);
    }

    const removeAll = () => {
        setItems([]);
    }

     // edit the item
     //When user click on edit button
     // 1 : get the id and name of the data which user clicked to edit
     // 2 : set the toggle mode to change the submit button into edit button
     // 3 : Now update the value of the setInput with the new updated value to edi
     // 4 : To pass the current element Id to new state variable for reference
   
     const editItem = (id) => {
        //find() method use 
      let newEditItem = items.find((elem) => {
        //always return a value
        return elem.id === id;
      })
      
      setToggleBtn(false);
      setInputfield(newEditItem.name);
      setIsEditItem(id);
    }

  return (
    <>
        <div className='main-div'>
            <div className='child-div'>
             <figure>
                <img src={cal} alt="todo-logo" />
                <figcaption>Add your list here</figcaption>
             </figure>
             <div className='addItems'>
                <input type="text" placeholder='add items ....' 
                    value={Inputfield}
                    onChange={(e) => setInputfield(e.target.value)}
                />
                {
                    toggleBtn ?   <i className="fa fa-plus add-btn" title="Add item" onClick={addItem}></i> : 
                    <i className="fa fa-edit add-btn" title="Add item" onClick={addItem}></i>
                }
              
             </div>
             <div className='showItems'>
               {
                items.map((elem) => {
                    return(
                        <div className='eachItem' key={elem.id}>
                        <h3>{elem.name}</h3>
                        <div className='todo-btn'>
                         <i className='fa fa-edit add-btn' title='Edit item' onClick={() => editItem(elem.id)}></i> 
                         <i className='fa fa-trash add-btn' title='Delete item' onClick={() => delItem(elem.id)}></i> 
                        </div>
                        </div>
                    )
                }
                )
               }
              
             </div>

             <div className='showItems'>
                 <button className='btn effect04' data-sm-link-text="Remove all" onClick={removeAll}><span>check list</span></button>
             </div>
            </div>
        </div>
    </>
  )
}

export default Todo