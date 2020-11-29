import React, { useState, useEffect } from 'react';
import ContainerHeader from 'components/ContainerHeader';
import FleetTable from 'components/dashboard/fleets/FleetTable';
import IntlMessages from 'util/IntlMessages';
import { List } from 'DataManager/DataManager';
import { useDispatch } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import CreateOrEdit from '../../../../../components/dashboard/fleets/actions/CreateOrEdit';
import Button from '@material-ui/core/Button';

const Fleets = ({match}) => {
    const dispatch = useDispatch();
    const [fleets, setFleets] = useState({
        list: []
    });
    const [editedId, setEditedId] = useState('');
    const [edit, setEdit] = useState(false)
    const [previewVisible, setPreviewVisible] = useState(false)
    const getFleets = async () => {
        try{
            const response = await List('fleets', undefined, 10, 0, undefined, undefined);
            
            setFleets({
                ...fleets,
                list: response
            });
            if(previewVisible){
                setPreviewVisible(false)
            }
            
            dispatch({fleets: response, type: 'SET_AIRLINES'});
        }
        catch(error) {
            console.log(error)
        }
    }

    const handleCancel = () => {
        setPreviewVisible(false);
    }

    useEffect(() => {
        getFleets();
    },[])

    return(
        <div className="dashboard animated slideInUpTiny animation-duration-3">
            <ContainerHeader match={match} title={<IntlMessages id="sidebar.dashboard.fleets"/>}/>
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
                        <h3 className="mb-0">Create New Fleet</h3>
                        </Button>
                    </div>
                    </div>
                    <FleetTable openModal={(data) => {
                                setPreviewVisible(true);
                                setEdit(true);
                                 
                                setEditedId(data);
                    }}
                    getFleets={getFleets} data={fleets.list}/>
                </div>
                </div>
            </div>
            <Modal isOpen={previewVisible} toggle={handleCancel}>
                <ModalHeader toggle={handleCancel}>{edit ? 'Edit Fleet' : 'Create Aitline'}</ModalHeader>
                <ModalBody>
                    <CreateOrEdit getFleets={getFleets} id={editedId} edit={edit}/>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default Fleets;