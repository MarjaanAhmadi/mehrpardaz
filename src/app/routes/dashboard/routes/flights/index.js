import React, { useState, useEffect } from 'react';
import ContainerHeader from 'components/ContainerHeader';
import FlightTable from 'components/dashboard/flights/FlightTable';
import IntlMessages from 'util/IntlMessages';
import { List } from 'DataManager/DataManager';
import { useDispatch } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import CreateOrEdit from 'components/dashboard/flights/actions/CreateOrEdit';
import Button from '@material-ui/core/Button';
import DetailsComp from 'components/dashboard/flights/actions/DetailsComp';
import LatestNotifications from 'components/dashboard/Common/LatestNotifications';
import AddFlightAttachment from 'components/dashboard/flights/actions/AddFlightAttachment';

const Flights = ({match}) => {
    const dispatch = useDispatch();
    const [flights, setFlights] = useState({
        list: []
    });
    const [editedId, setEditedId] = useState('');
    const [edit, setEdit] = useState(false);
    const [previewVisibleDetail, setPreviewVisibleDetail] = useState(false);
    const [addAttachmentModal, setAddAttachmentModal] = useState(false)
    const [detailId, setDetailedId] = useState('');
    const [previewVisible, setPreviewVisible] = useState(false)
    const getFlights = async () => {
        try{
             
            const response = await List('flights', undefined, 100, 0, undefined, undefined);
             
            setFlights({
                ...flights,
                list: response.filter(i=>i.is_deleted === false)
            });
            if(previewVisible){
                setPreviewVisible(false)
            }
            
            dispatch({flights: response, type: 'SET_FLIGHTS'});
        }
        catch(error) {
            console.log(error)
        }
    }
    const handleCancelDetail = () => {
        setPreviewVisibleDetail(false);
    }
    const handleCancelAddAttachment = () => {
        setAddAttachmentModal(false)
    }

    const handleCancel = () => {
        setPreviewVisible(false);
    }

    useEffect(() => {
        getFlights();
    },[])

    return(
        <div className="dashboard animated slideInUpTiny animation-duration-3">
            <ContainerHeader match={match} title={<IntlMessages id="sidebar.dashboard.flights"/>}/>
            <div className="row mb-md-3">
                <div className="col-12">
                <div className="jr-card">
                    <div className="jr-card-header d-flex align-items-center">
                    <div className={`jr-btn-group d-flex flex-wrap mt-3`}>
                        <Button onClick={()=>{
                                setPreviewVisible(true);
                                setEditedId('');
                                setEdit(false)
                            }} 
                            variant="contained" color="primary" className="jr-btn text-white">
                        <h3 className="mb-0">Create New Flight</h3>
                        </Button>
                    </div>
                    </div>
                    <FlightTable 
                    openModal={(data) => {
                        setPreviewVisible(true);
                        setEdit(true);
                        setEditedId(data);
                    }}
                    openDetailedLog={(data) => {
                        setPreviewVisibleDetail(true);                         
                        setEdit(false);                                 
                        setDetailedId(data);
                    }} 
                    openAddAtachmentModal={(data) => {
                        setAddAttachmentModal(true);                         
                        setEdit(false);                                 
                        setDetailedId(data);
                        }
                    }
                    getFlights={getFlights}
                    data={flights.list}/>
                </div>
                </div>
            </div>
            <Modal isOpen={previewVisible} toggle={handleCancel}>
                <ModalHeader toggle={handleCancel}>{edit ? 'Edit Flight' : 'Create Flight'}</ModalHeader>
                <ModalBody>
                    <CreateOrEdit getFlights={getFlights} id={editedId} edit={edit}/>
                </ModalBody>
            </Modal>
            <Modal isOpen={previewVisibleDetail} toggle={handleCancelDetail}>
                <ModalHeader toggle={handleCancelDetail}>Flight Details</ModalHeader>
                <ModalBody>
                    <LatestNotifications title="Flight Details" detailId={detailId}/>
                </ModalBody>
            </Modal>
            <Modal isOpen={addAttachmentModal} toggle={handleCancelAddAttachment}>
                <ModalHeader toggle={handleCancelAddAttachment}>Add Attachment Flight</ModalHeader>
                <ModalBody>
                    <AddFlightAttachment closeModal={handleCancelAddAttachment} getFlights={getFlights} detailId={detailId}/>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default Flights;