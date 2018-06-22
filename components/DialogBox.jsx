import React from 'react';
import Modal from 'react-responsive-modal';


export default class DialogBox extends React.Component {

	constructor(props) {
		super(props);
		this.cancelDelete = this.cancelDelete.bind(this);
		this.deleteComment = this.deleteComment.bind(this);
	}

	deleteComment() {
		this.props.deleteComment(this.props.commentId, this.props.postId, this.props.user, this.props.parentId);
	}

	cancelDelete() {
		this.props.cancelDelete();
	}

	render() {
		return(
			<div>
                <Modal open={this.props.open} onClose={this.props.onClose} showCloseIcon={this.props.showCloseIcon} center>
                  <div id="modal_main">
                        <div className="modal_header">
                          <div className="modal_title" id="__w2_lrvWDrU_modal_title">Delete Comment</div>
                        </div>
                        <div className="modal_content" id="__w2_lrvWDrU_content">Are you sure you want to delete this comment?</div>
                        <div className="modal_footer" id="__w2_lrvWDrU_modal_footer">
                            <span className="text_links">
                              <a onClick={this.cancelDelete} className="modal_cancel_link">Cancel</a>
                            </span>
                              <button onClick={this.deleteComment} className="submit_button">Confirm</button>
                        </div>
                  </div>
                </Modal>
              </div>
		)
	}
}
