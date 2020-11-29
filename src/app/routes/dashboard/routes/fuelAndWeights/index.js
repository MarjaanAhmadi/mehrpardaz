import React, { useState, useEffect } from 'react';
import ContainerHeader from 'components/ContainerHeader';
import FuelAndWeightTable from 'components/dashboard/fuelAndWeights/FuelAndWightTable';
import IntlMessages from 'util/IntlMessages';
import { List } from 'DataManager/DataManager';
import { useDispatch } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import CreateOrEdit from '../../../../../components/dashboard/fuelAndWeights/actions/CreateOrEdit';
import Button from '@material-ui/core/Button';

const FuelAndWeights = ({match}) => {
    const dispatch = useDispatch();
    const [fuelAndWeights, setFuelAndWeights] = useState({
        list: []
    });
    const [editedId, setEditedId] = useState('');
    const [edit, setEdit] = useState(false)
    const [previewVisible, setPreviewVisible] = useState(false)
    const getFuelAndWeights = async () => {
        try{
            const response = await List('fuel-and-weights', undefined, 100, 1, undefined, undefined);
            const li = response.filter(i => i.is_deleted === false);
            setFuelAndWeights({
                ...fuelAndWeights,
                list: li
            });
            if(previewVisible){
                setPreviewVisible(false)
            }
            
            dispatch({fuelAndWeights: response, type: 'SET_FUEL_AND_WEIGHTS'});
        }
        catch(error) {
            console.log(error)
        }
    }

    const handleCancel = () => {
        setPreviewVisible(false);
    }

    useEffect(() => {
        getFuelAndWeights();
    },[])

    return(
        <div className="dashboard animated slideInUpTiny animation-duration-3">
            <ContainerHeader match={match} title={<IntlMessages id="sidebar.settings.fuelAndWeights"/>}/>
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
                        <h3 className="mb-0">Create New Fuel And Weight</h3>
                        </Button>
                    </div>
                    </div>
                    <FuelAndWeightTable openModal={(data) => {
                                setPreviewVisible(true);
                                setEdit(true);
                                setEditedId(data);
                    }}
                    getFuelAndWeights={getFuelAndWeights} data={fuelAndWeights.list}/>
                </div>
                </div>
            </div>
            <Modal isOpen={previewVisible} toggle={handleCancel}>
                <ModalHeader toggle={handleCancel}>{edit ? 'Edit Fuel And Weight' : 'Create Fuel And Weight'}</ModalHeader>
                <ModalBody>
                    <CreateOrEdit getFuelAndWeights={getFuelAndWeights} id={editedId} edit={edit}/>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default FuelAndWeights;