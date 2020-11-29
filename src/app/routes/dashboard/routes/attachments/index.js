import React, { useState, useEffect } from 'react';
import ContainerHeader from 'components/ContainerHeader';
import AttachmentTable from 'components/dashboard/attachments/AttachmentTable';
import IntlMessages from 'util/IntlMessages';
import { List } from 'DataManager/DataManager';
import { useDispatch } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import CreateOrEdit from '../../../../../components/dashboard/attachments/actions/CreateOrEdit';
import Button from '@material-ui/core/Button';

const Attachments = ({match}) => {
    const dispatch = useDispatch();
    const [attachments, setAttachments] = useState({
        list: []
    });
    const [editedId, setEditedId] = useState('');
    const [edit, setEdit] = useState(false)
    const [previewVisible, setPreviewVisible] = useState(false)
    const getAttachments = async () => {
        try{
            const response = await List('attachments', undefined, 10, 0, undefined, undefined);
            
            setAttachments({
                ...attachments,
                list: response
            });
            if(previewVisible){
                setPreviewVisible(false)
            }
            
            dispatch({attachments: response, type: 'SET_AIRLINES'});
        }
        catch(error) {
            console.log(error)
        }
    }

    const handleCancel = () => {
        setPreviewVisible(false);
    }

    useEffect(() => {
        getAttachments();
    },[])

    return(
        <div className="dashboard animated slideInUpTiny animation-duration-3">
            <ContainerHeader match={match} title={<IntlMessages id="sidebar.dashboard.attachments"/>}/>
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
                        <h3 className="mb-0">Create New Attachment</h3>
                        </Button>
                    </div>
                    </div>
                    <AttachmentTable openModal={(data) => {
                                setPreviewVisible(true);
                                setEdit(true);
                                 
                                setEditedId(data);
                    }}
                    getAttachments={getAttachments} data={attachments.list}/>
                </div>
                </div>
            </div>
            <Modal isOpen={previewVisible} toggle={handleCancel}>
                <ModalHeader toggle={handleCancel}>{edit ? 'Edit Attachment' : 'Create Aitline'}</ModalHeader>
                <ModalBody>
                    <CreateOrEdit getAttachments={getAttachments} id={editedId} edit={edit}/>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default Attachments;