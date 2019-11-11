import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks';
import { getFirestore } from 'redux-firestore';

class HomeScreen extends Component {
    state = {
        isNewItem : false,
    }

    handleNewList = () => {
        const fireStore = getFirestore();
            fireStore.collection('todoLists').add({
                    name: 'Unknown',
                    owner: 'Unknown',
                    items: [],
                    key: 0
        })
        //db.collection('chatroom').doc(name).get(id);
        //this.setState({isNewItem : true});
    }

    render() {

        if (this.state.isNewItem) {
            //let answer = '/todoList/' + todoList.id;
           // return <Redirect to={answer} />;
        }

        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        return (
            
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8" >
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
)(HomeScreen);