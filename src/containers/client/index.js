import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Button, TextField, TextareaAutosize, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import * as companyActions from '../../actions/companyActions';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {message, Spin,} from 'antd';
import ReplayIcon from '@material-ui/icons/Replay';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import "./client.scss";
import Header from "../../components/header";

function Client(props) {
  const { companies, length, isLoading,  companyActions, menu, handleMenu } = props;
  const columns = [
    { id: 'name', label: 'Наименование компании', minWidth: 170,  align: 'left', },
    { id: 'type', label: 'Тип юр.лица', minWidth: 100,  align: 'left', },
    {
      id: 'region',
      label: 'Регион',
      minWidth: 170,
      align: 'left',     
    },
    {
      id: 'city',
      label: 'Город',
      minWidth: 170,
      align: 'left',
    },
    {
      id: 'actions',
      label: '',
      minWidth: 170,
      align: 'left',
      
    },
  ];
  
  function createData(name, type, region, city, actions) {  
    return { name, type, region, city, actions };
  }
  
  
  function getModalStyle() {  
    return {
      display: `flex`,
      justifyContent: `center`,
      alignItems: `center`,
    };
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    wrapper: {
        padding: " 10px 0",
        width: "100%"
    },
    formControl: {
      margin: theme.spacing(1),
      fontSize: '12px',
      width: "24%",
      padding: "0 10px",
      height: "35px"
    },
    container: {
      maxHeight: 700,
      padding: "20px",
    },
    textFieldFilter: {
      fontSize: '12px',
      width: "24%",
      padding: "0 10px",
      height: "35px"
    },
    select: {
      fontSize: '12px',
      width: "24%",
      padding: "0 5px",
      height: "35px"
    },
    textFieldIcon: {
      fontSize: '15px',
      width: "4%",
      padding: "0 10px",
      height: "35px"
    },
   
    text: {
        height: "35px"
    },
    textArea: {
        width: "100%",
        padding: "0 10px",
    },
   
    button: {
        padding: "16px 0",
        width: "40%"
    }
  }));
  
  useEffect(() => {
    companyActions.getCompanies(page + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [page, setPage] = useState(0);
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [elements, setElements] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [addForm, setAddForm] = useState({
      name: "",
      shortname: "",
      registered_type: "",
      region: "",
      city: "",
      workscope: "",
      phone: "",
      email: "",
      description: ""
  })
  const handleDelete = id => {
      if (id) {
        props.companyActions.deleteCompany(id, page + 1);      
      } else {
          message.error('Ошибка при удалении')
      }
     
  }
  const handleSave = () => {
    if (addForm.city && validateEmail(addForm.email) && addForm.name && addForm.phone && addForm.registered_type && addForm.workscope) {
      props.companyActions.addCompany(addForm, page + 1, handleClose);
    } else if (!validateEmail(addForm.email)) {
      message.error('Email недействителен');
    } else {
      message.error('Заполните все поля');
    }
     
  }
  const resetFilter = () => {
    setName('');
    setElements([]);
  }
  const onChange = e => {
    const { name, value } = e.target;
    setAddForm(prev => ({
        ...prev,
        [name]: value
    }));
  }
  let rows = []
  rows = companies?.results?.map((item, i) => createData(item.name, item.type, item.region, item.city, <div key={i} style={{color: "#666"}}><Link style={{color: "#666"}} to={`/dashboard/client/${item.id}`}><EditIcon /></Link><DeleteIcon onClick={() => handleDelete(item.id)}/></div>))

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    props.companyActions.getCompanies(newPage + 1);
  };
  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const validateEmail = email => {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
  }
  const onChangeName = e => {
    const elements = rows.filter((item) => item.name.toLowerCase().includes(e.target.value));  
    setName(e.target.value)
    setElements(elements)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const body = (
    <div className="add-paper">
      <div className="add-paper--header">
        <h2>Добавить клиента</h2>
        <CloseIcon onClick={handleClose}/>
      </div> 
      <form>
        <div className="edit-from--wrapper">
          <FormControl className="form-control-edit">
              <TextField onChange={onChange}   name="name" value={addForm.name} label="Наименование компании" variant="outlined" />     
          </FormControl>
          <FormControl className="form-control-edit">  
            <TextField onChange={onChange} name="shortname" value={addForm.shortname} label="Короткое название" variant="outlined" />
          </FormControl>
        </div>
        <div className="edit-from--wrapper">
          <FormControl className="form-control-edit"> 
            <TextField onChange={onChange} className={classes.text}  id="outlined-basic" name="registered_type" value={addForm.registered_type} label="Тип юр.лица" variant="outlined" />
          </FormControl>
          <FormControl className="form-control-edit">
            <TextField onChange={onChange} id="outlined-basic" name="workscope" value={addForm.workscope} label="Сфера деятельности" variant="outlined" />
          </FormControl>
        </div>
        <div className="edit-from--wrapper">
          <FormControl className="form-control-edit">
            <TextField onChange={onChange} id="outlined-basic" name="region" value={addForm.region} label="Регион" variant="outlined" />   
          </FormControl>
          <FormControl className="form-control-edit">
            <TextField onChange={onChange} id="outlined-basic" name="city" value={addForm.city} label="Город" variant="outlined" />     
          </FormControl>
        </div>
        <div className="edit-from--wrapper">
          <FormControl className="form-control-edit">
            <TextField error={!validateEmail(addForm.email) && addForm?.email.length > 0 ? "Email недействителен" : ""} onChange={onChange} id="outlined-basic" name="email" value={addForm.email} label="Email" variant="outlined" />        
          </FormControl>
          <FormControl className="form-control-edit">
            <TextField onChange={onChange} id="outlined-basic" name="phone" value={addForm.phone} label="Телефон" variant="outlined" />       
          </FormControl>
        </div>
        <div className="edit-from--wrapper">
          <FormControl className={classes.textArea}>
            <TextareaAutosize onChange={onChange} rows={3} name="description" value={addForm.description}   placeholder="Дополнительно(описание)" />        
          </FormControl>
        </div>
        <FormControl style={{display: "flex", alignItems: "flex-end", marginRight: "10px"}}>
           <Button onClick={handleSave} color="primary" className={classes.button} variant="contained">
              Добавить
            </Button>
        </FormControl>
      </form>  
    </div>
  );
  return (
      <Spin spinning={isLoading}>
         <Header menu={menu} handleMenu={handleMenu} companyName={'Клиенты'} handleOpen={handleOpen}/>
        <div className="wrapper">
            <Paper className={classes.root}>
              <form className="form-filter">
                <FormControl className={classes.textFieldFilter}>
                  <TextField  value={name} onChange={onChangeName} label="Наименование компании" variant="outlined"/>
                </FormControl>
                <FormControl variant="outlined" className={classes.select}>
                <InputLabel id="demo-simple-select-outlined-label">Тип юр.лица</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  // value={age}
                  // onChange={handleChange}
                  label="Тип юр.лица"
                >
                  <MenuItem value={10}>АО</MenuItem>
                  <MenuItem value={20}>ТОО</MenuItem>
                  <MenuItem value={30}>ИП</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.select}>
                <InputLabel id="demo-simple-select-outlined-label">Регион</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  // value={age}
                  // onChange={handleChange}
                  label="Регион"
                >
                  <MenuItem value={10}>Регион</MenuItem>
                  </Select>
                </FormControl>
                <FormControl  className={classes.textFieldFilter}>
                  <TextField onChange={onChangeName} label="Город" variant="outlined"/>       
                </FormControl>
                <FormControl  className={classes.textFieldIcon}>
                  <ReplayIcon onClick={resetFilter} style={{paddingTop: "5px", cursor: "pointer"}}/>   
                </FormControl> 
            </form>
            <TableContainer className={classes.container}>
              <Table stickyHeader  aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {elements.length > 0 || name.length > 0 ? elements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  }) : rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={elements.length > 0 || name.length > 0 ? elements.length : length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />  
        </Paper>
    </div>
    <Modal
      style={modalStyle}
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </Spin>
  );
}
Client.propTypes = {
    isLoading: PropTypes.bool,   
    companies: PropTypes.object 
};
const mapStateToProps = state => ({
    error: state.company.error,
    companies: state.company.companies,
    length: state.company.companies.count,
    isLoading: state.company.isLoading,
});
const mapDispatchToProps = dispatch => ({
    companyActions: bindActionCreators(companyActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Client));