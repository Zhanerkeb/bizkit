import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Button, TextField, TablePagination, TextareaAutosize, FormControl, Tab, Tabs, Box, Typography, Switch, FormControlLabel} from '@material-ui/core';
import MaterialTable from 'material-table';
import * as companyActions from '../../actions/companyActions';
import * as bankActions from '../../actions/bankActions';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Spin } from 'antd';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import "./client.scss";
import Header from '../../components/header';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography component={'span'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
function ClientPage(props) {
  const { isLoading, company, companyActions, match, length, banks, menu, handleMenu, isLoadingBank } = props;
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  function getModalStyle() {
      return {
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
      };
    }
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
      props.companyActions.getCompanies(newPage + 1);
    };
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
     
    },
   
    container: {
      maxHeight: 524,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
   
    text: {
        height: "35px"
    },
    textArea: {
        width: "100%",
        color: "rgba(0, 0, 0, 0.87)",
        opacity: 0.6,
        padding: "0 10px",
        marginBottom: "10px"
    },
    
  }));
  
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 1) {
      props.bankActions.getBanks(match.params.id, page+1)
    }
  };
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
  const validateEmail = email => {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
  }
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    shortname: "",
    registered_type: "",
    registered_name: "",
    bin_iin: "",
    registered_address: "",
    address: "",
    leader: "",
    leader_position: "",
    tax_payer: "",
    region: "",
    city: "",
    workscope: "",
    phone: "",
    email: "",
    description: ""
  })
  useEffect(() => {
    companyActions.getById(match.params.id);
}, [])
useEffect(() => {      
    setEditForm({
      id: company.id,
      name: company.name,
      shortname: company.shortname,
      registered_type: company.registered_type,
      registered_name: company.registered_name,
      bin_iin: company.bin_iin,
      registered_address: company.registered_address,
      address: company.address,
      leader: company.leader,
      leader_position: company.leader_position,
      tax_payer: company.tax_payer,
      region: company.region,
      city: company.city,
      workscope: company.workscope,
      phone: company.phone,
      email: company.email,
      description: company.description
    });
}, [company]);
const [state, setState] = React.useState({
  columns: [
    { title: 'Банк', field: 'bank' },
    { title: 'БИК', field: 'bank_id_code' },
    { title: 'Номер счета', field: 'account_number' },
    {
      title: 'Валюта',
      field: 'currency',
    },
  ],
  
})
let data = [];
data = banks?.results?.map((item) => {
  return (
    {
      id: item.id,
      bank: item.bank, 
      bank_id_code: item.bank_id_code,
      account_number: item.account_number,
      currency: item.currency
    }
  )
})
console.log(state.data)
  const onChange = e => {
    const { name, value } = e.target;
    setAddForm(prev => ({
        ...prev,
        [name]: value
    }));
  }
  const onEditChange = e => {
    const { name, value } = e.target;
    setEditForm(prev => ({
        ...prev,
        [name]: value
    }));
  }
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
      props.companyActions.addCompany(addForm, 1, handleClose);     
  };
  const handleEdit = () => {
    companyActions.updateCompany(editForm, editForm.id);
  }
  const handleSwitch = e => {
      setEditForm(prev => ({
        ...prev,
        tax_payer: e.target.checked
    }))
  }
 
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
          <Button disabled={!addForm.name || !addForm.city || !addForm.registered_type || !addForm.workscope || !addForm.phone || !addForm.email || !validateEmail(addForm.email)} onClick={handleSave} color="primary"  className="save-btn" variant="contained">
            Добавить
          </Button>
        </FormControl>
    </form>
  </div>
  );
  return (
      <div>
         <Header menu={menu} handleMenu={handleMenu} companyName={company.name} handleOpen={handleOpen}/>
          <div className="wrapper">
            <Paper className={classes.root}>
              <Tabs
                  value={value}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleChange}
                
                >
                  <Tab label="Информация" />
                  <Tab label="Банковские реквизиты"  />
                  
                </Tabs>
                  <TabPanel value={value} index={0}>
                  <Spin  spinning={isLoading}>    
                    <div className="main-info">
                        <div className="main-info--left">
                            <h2>Основная информация</h2>
                            <form className="edit-form">
                                <div className="edit-from--wrapper">
                                  <FormControl className="form-control-edit first">
                                      <TextField  
                                      onChange={onEditChange} 
                                      name="name" 
                                      value={editForm.name} 
                                      label="Наименование компании" 
                                      variant="outlined" />     
                                  </FormControl>
                                </div>
                                <div className="edit-from--wrapper">
                                  <FormControl className="form-control-edit">   <TextField onChange={onEditChange} name="shortname" value={editForm.shortname} label="Короткое название" variant="outlined" />
                                  </FormControl>
                                  <FormControl className="form-control-edit">
                                    <TextField onChange={onEditChange} id="outlined-basic" name="workscope" value={editForm.workscope} label="Сфера деятельности" variant="outlined" />
                                
                                  </FormControl>
                                </div>
                                <div className="edit-from--wrapper">
                                  <FormControl className="form-control-edit">
                                    <TextField onChange={onEditChange} id="outlined-basic" name="region" value={editForm.region} label="Регион" variant="outlined" />
                                  </FormControl>
                                  <FormControl className="form-control-edit">
                                    <TextField onChange={onEditChange} id="outlined-basic" name="city" value={editForm.city} label="Город" variant="outlined" />
                                  </FormControl>
                                </div>
                                <div className="edit-from--wrapper">
                                  <FormControl className="form-control-edit">
                                    <TextField error={!validateEmail(editForm.email) && editForm.email?.length > 0 ? "Email недействителен" : ""} onChange={onEditChange} id="outlined-basic" name="email" value={editForm.email} label="Email" variant="outlined" />
                                  </FormControl>
                                  <FormControl className="form-control-edit">
                                    <TextField onChange={onEditChange} id="outlined-basic" name="phone" value={editForm.phone} label="Телефон" variant="outlined" />
                                  </FormControl>
                                </div>
                                <div className="edit-from--wrapper">
                                  <FormControl className={classes.textArea}>
                                    <TextareaAutosize onChange={onEditChange} rows={3} name="description" value={editForm.description}   placeholder="Дополнительно(описание)" />   
                                  </FormControl>
                                </div>
                            </form>
                        </div>
                        <div className="main-info--right">
                            <h2>Реквизиты компании</h2>
                            <form className="edit-form">
                              <div className="edit-from--wrapper">
                                <FormControl className="form-control-edit first">
                                  <TextField onChange={onEditChange}   name="registered_name" value={editForm.registered_name} label="Наименование юр.лица" variant="outlined" />     
                                </FormControl>  
                              </div>
                              <div className="edit-from--wrapper">
                                <FormControl className="form-control-edit"> 
                                  <TextField onChange={onEditChange} id="outlined-basic" name="registered_type" value={editForm.registered_type} label="Тип юр.лица" variant="outlined" />
                                </FormControl>
                                <FormControl className="form-control-edit">
                                  <TextField onChange={onEditChange} id="outlined-basic" name="bin_iin" value={editForm.bin_iin} label="БИН/ИИН" variant="outlined" />
                                 </FormControl>
                              </div>
                              <div className="edit-from--wrapper">
                                <FormControl className="form-control-edit">
                                  <TextField onChange={onEditChange} id="outlined-basic" name="leader" value={editForm.leader} label="Руководитель" variant="outlined" />
                                  </FormControl>
                                <FormControl className="form-control-edit">
                                  <TextField onChange={onEditChange} id="outlined-basic" name="leader_position" value={editForm.leader_position} label="Должность руководителя" variant="outlined" />  
                                </FormControl>
                              </div>
                              <div className="edit-from--wrapper">
                                <FormControl className="form-control-edit">
                                  <TextField onChange={onEditChange} id="outlined-basic" name="registered_address" value={editForm.registered_address} label="Юридический адрес" variant="outlined" />
                                  
                                  </FormControl>
                                <FormControl className="form-control-edit">
                                  <TextField onChange={onEditChange} id="outlined-basic" name="address" value={editForm.address} label="Фактический адрес" variant="outlined" />
                                
                                </FormControl>
                              </div>
                              <div className="edit-from--wrapper">
                                <FormControlLabel
                                    value="start"
                                    control={<Switch
                                      checked={editForm.tax_payer}
                                      color="primary"
                                      style={{
                                        fontSize: '12px '
                                      }}
                                      onChange={handleSwitch}
                                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />}
                                    label="Плательщик НДС (нет/да)"
                                    labelPlacement="start"
                                  />
                                  
                                </div>
                                <FormControl  style={{display: "flex", alignItems: "flex-end"}}>
                                  <Button className="save-btn" disabled={!editForm.name || !editForm.city || !editForm.registered_type || !editForm.workscope || !editForm.phone || !editForm.email || !validateEmail(editForm.email)}   onClick={handleEdit} color="primary"  variant="contained">
                                    <AddIcon/> Сохранить
                                  </Button>
                                </FormControl>
                              </form>
                            </div>
                          </div>
                      </Spin>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <Spin spinning={isLoadingBank}>
                          <MaterialTable
                            title="Банковские реквизиты компании"
                            columns={state.columns}
                            component={'tr'}
                            data={data}
                            localization={{
                              body: {
                                  emptyDataSourceMessage: "Нет данных",
                                  addTooltip: 'Добавление',
                                  deleteTooltip: 'Удаление',
                                  editTooltip: 'Редактирование',
                                  filterRow: {
                                      filterTooltip: 'Filtrer'
                                  },
                                  editRow: {
                                      deleteText: 'Хотите удалить реквизит?',
                                      cancelTooltip: 'Отмена',
                                      saveTooltip: 'Сохранить'
                                  }
                              },
                        
                              header: {
                                  actions: 'Действия'
                              },
                            
                              toolbar: {
                          
                                  searchTooltip: 'Поиск',
                                  searchPlaceholder: 'Поиск'
                              }
                          }}
                            components={{
                              Pagination: props => (
                                <TablePagination
                              rowsPerPageOptions={[10, 25, 100]}
                              component="div"
                              count={length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onChangePage={handleChangePage}
                              onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                      ),
                            }}
                            editable={{
                              onRowAdd: (newData) =>
                                new Promise((resolve) => {
                                  setTimeout(() => {
                                    resolve();
                                  props.bankActions.addBank(newData, match.params.id, page+1);
                                  }, 600);
                                }),
                              onRowUpdate: (newData, oldData) =>
                                new Promise((resolve) => {
                                  setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                      props.bankActions.updateBank(newData, match.params.id, page+1);
                                    }
                                  }, 600);
                                }),
                              onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                  setTimeout(() => {
                                    resolve();
                                    props.bankActions.deleteBank(oldData.id, match.params.id, page+1);
                                  }, 600);
                                }),
                            }}
                          />
                        </Spin>
                      </TabPanel>
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
  </div>
  );
}
ClientPage.propTypes = {
    isLoading: PropTypes.bool,   
    company: PropTypes.object,
    banks: PropTypes.object,
    length: PropTypes.number,
    isLoadingBank: PropTypes.bool
};
const mapStateToProps = state => ({
    error: state.company.error,
    company: state.company.company,
    isLoading: state.company.isLoading,
    isLoadingBank: state.bank.isLoading,
    banks: state.bank.banks,
    length: state.bank.banks.count
});
const mapDispatchToProps = dispatch => ({
    companyActions: bindActionCreators(companyActions, dispatch),
    bankActions: bindActionCreators(bankActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(ClientPage));