import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {AiFillPlusCircle,AiFillDelete} from 'react-icons/ai'

function formatBytes(bytes:number, decimals = 2):String{
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

function App() {
  const [data, setData] = useState<any[]>([])
  const [file, setFile] = useState<any>(null)
  useEffect(()=>{
    axios.get('http://localhost:3001/file').then((res)=>{
      setData(res?.data)
    }).catch((err)=>{
      throw err
    })
  },[])
  

  const deleteFile = (id:number)=>{
    console.log(id)
    axios.delete(`http://localhost:3001/file/${id}`).then((res)=>{
      window.location.reload()
    }).catch((err)=>{
      throw err
    })
  }
  const postFile = async ()=>{
    const data = new FormData();
    const filename = Date.now()+file.name;
    data.append("name", filename)
    data.append("file", file)
    try{
      await axios.post('http://localhost:3001/file', data)
      window.location.reload()
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div>
        <div className='flex flex-col items-center pt-10 font-semibold'>
          <h1 className='text-3xl'>File Uploader</h1>
        </div>
        <div className="flex flex-col mx-20 my-20">
            <form action="" method='' onSubmit={()=>postFile()}>
              <label htmlFor='add'><AiFillPlusCircle className='items-end w-10 h-10 text-green-500' /></label>
              <input type='file' id = 'add' name='file' className='hidden' onChange = {(e:any)=>{setFile(e.target.files[0])}} />
              <button type='submit'>Add</button>
            </form>
             
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr className='bg-gray-300'>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      #
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      File Name
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      File Size
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Uploaded Date
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">

                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                  data.map((fi, index)=>(             
                    <tr className="border-b" key={fi.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {fi.file_name}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {formatBytes(fi.file_size)}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {new Date(fi.date).toDateString()}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <div className='rounded-full hover:bg-red-200/40 w-9 p-2 flex flex-col items-center'>
                          <AiFillDelete className='text-red-500 w-8 h-5 ' onClick={()=>{deleteFile(fi.id)}} />
                        </div>
                      </td>
                    </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
