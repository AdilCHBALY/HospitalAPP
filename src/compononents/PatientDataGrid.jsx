import React from 'react'
import axios from 'axios'
import {Table , Popconfirm ,Button,Space,Form,Input} from 'antd'
import {isEmpty} from 'lodash';
import { useState,useEffect } from 'react';
import { Trash3,PencilSquare,XLg,CloudDownload } from 'react-bootstrap-icons';

function PatientDataGrid({setClosed,closed}) {
    const [gridData,setGridData] = useState([])
    const [loading,setLoading] = useState(false)
    const [editingKey,setEditingKey] = useState("")
    const [sortedInfo,setSortedInfo] = useState({})
    const [form] = Form.useForm()
    const [searchText,setSearchText] = useState("")
    let [filteredData] = useState()

    const URL = "http://127.0.0.1:8000/patient"
    const loadVehiculeData=async()=>{
      setLoading(true)
      const res = await axios.get(URL)
      setGridData(res.data)
      setLoading(false)
    }


    useEffect(()=>{
      loadVehiculeData()
    },[closed])
  useEffect(()=>{
    loadVehiculeData()
  },[])

  //this gonna be changed with the axios DELETE Method 
  const handleDelete=async(val)=>{
    await axios.delete(URL+"/"+val.PatientId)
    loadVehiculeData()
  }



  const modifiedData = gridData.map(({body,...item})=>({
    ...item,
    key : item.PatientId,
    comment : isEmpty(body) ? item.comment : body
  }))

  

  const edit = (record)=>{
    form.setFieldsValue({
      name :"",
      birthday : "",
      illness : "",
      ...record
    })
    setEditingKey(record.key)
  }

  const cancel = ()=>{
    setEditingKey("")
  }

  const handleAlert=(message)=>{
    alert(message)
  }

  const save =async (key)=>{
    try{
      const row = await form.validateFields()
      const newData = [...modifiedData]
      const index = newData.findIndex((item)=>key === item.key)
      if(index > -1)
      {
        const item = newData[index]
        newData.splice(index,1,{...item,...row})
        await axios.put(URL+"/"+key,newData[index]).then(res=>handleAlert(res.data)).catch(err=>handleAlert(err))
        setGridData(newData)
        setEditingKey("")
      }
    }catch(err){
      console.log("Error in Editing ",err)
    }
  }

  const edittableCell = ({
    editing,
    dataIndex,
    title,
    record,
    children,
    ...restProps
  })=>{
      const input = <Input />

      return(
        <td {...restProps}>
          {editing ?
            <Form.Item
            name={dataIndex}
            style={{
              margin : 0
            }}
            rules = {[
              {
                required : true,
                message : `Please Input ${title}`
              },
            ]}
            >
              {input}
            </Form.Item> 
          : children
           }
        </td>
      )
  }

  const cols = [
    {
      title : "ID",
      dataIndex : "PatientId",
    },
    {
      title : "Name",
      dataIndex : "PatientName",
      align : "center",
      editable : true,
      sorter : (a,b)=>a.PatientName.length - b.PatientName.length,
      sortOrder : sortedInfo.columnKey === 'PatientName' && sortedInfo.order,
    
    },
    {
    title : "Birth Day",
    dataIndex : "PatientBirthDay",
    align : "center",
    editable : true,
    sorter : (a,b)=>a.PatientBirthDay.length - b.PatientBirthDay.length,
    sortOrder : sortedInfo.columnKey === 'PatientBirthDay' && sortedInfo.order,
    },
    {
    title : "Illness",
    dataIndex : "PatientIllness",
    align : "center",
    editable : true,
    sorter : (a,b)=>a.PatientIllness.length - b.PatientIllness.length,
    sortOrder : sortedInfo.columnKey === 'PatientIllness' && sortedInfo.order,
    },
    {
      title : "Actions",
      dataIndex : "actions",
      align : "center",
      render : (_,record)=>{
        const editable = isEditing(record)
        return modifiedData.length>=1 ?
        (
          <Space>
            <Popconfirm 
            title="Sure to Delete ?"
            onConfirm={()=>{
              handleDelete(record)
            }}
          >
            <Button type='primary' danger ><Trash3 /></Button>
          </Popconfirm>
          {editable ? 
                <span>
                <Space size={'middle'}>
                <Button 
                  onClick={(e)=>{save(record.key)}}
                  type="primary"
                  style={{color : "white" , background:"#40c764" ,border:"1px solid white",marginRight : 8}}
                >
                  <CloudDownload />
                </Button>
                <Popconfirm
                  title="Sure to Cancel ?"
                  onConfirm={()=>{
                    cancel()
                  }}
                >
                  <Button><XLg /></Button>
                </Popconfirm>
                </Space>
              </span>
             : 
                <Button
                onClick={()=>{
                  edit(record)
                }}
                style={{color : "white" , background:"#40c764" ,border:"1px solid white"}}
                type = "primary"
              ><PencilSquare /></Button>
               }
          </Space>
        ):
        null
      } ,
    }
  ]


  const isEditing=(record)=>{
    return record.key===editingKey
  }

  const mergedCols = cols.map((col)=>{
    if(!col.editable) return col
    return {
      ...col,
      onCell : (record)=>({
        record,
        dataIndex : col.dataIndex,
        title : col.title,
        editing : isEditing(record),
      })
    }
  })

  const handleChange = (...sorter)=>{
    const {order,field} = sorter[2]

    setSortedInfo({columnKey : field , order})
  }

  const handleClear=()=>{
    setSortedInfo({})
    setSearchText("")
    loadVehiculeData()
  }

  const handleSearch=(e)=>{
    setSearchText(e.target.value)
    console.log(e.target.value)
    if(e.target.value)
    {
      globalSearch()
    }
    if(e.target.value===""){
      loadVehiculeData()
    }
  }

  const globalSearch=()=>{
    filteredData = modifiedData.filter((value)=>{
      return (
        value.PatientName.toLowerCase().includes(searchText.toLowerCase()) || 
        value.PatientBirthDay.includes(searchText) ||
        value.PatientIllness.toLowerCase().includes(searchText.toLowerCase()) 
      )
    })
    setGridData(filteredData)
  }

  const handleAdd=()=>{
    setClosed(true)
  }
  return (
    <div>
        <div className='header' >
        
        <Input
        placeholder='Enter Search Text'
        onChange={handleSearch}
        type="text"
        allowClear
        value={searchText}
        className='SearchInput'
        />
        <div className="header__func">
        <Button onClick={handleClear} className='ClearAll'>Clear All</Button>
        <Button onClick={handleAdd} className='AddBtn'>Add Patient</Button>
        </div>
        
      </div>
      <div className="table">

     <Form form={form} component={false}>
     <Table
        components={{
          body : {
            cell : edittableCell,
          }
        }}
        columns={mergedCols}
        loading={loading}
        dataSource={filteredData && filteredData.length ? filteredData : modifiedData}
        onChange={handleChange}
        bordered
        pagination={{ pageSize: 9 }}
        size='small'
       ></Table>
     </Form>
      </div>
    </div>
  )
}

export default PatientDataGrid
