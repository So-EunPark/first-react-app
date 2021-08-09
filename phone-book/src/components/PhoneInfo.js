import React, { Component } from 'react';

class PhoneInfo extends Component {
    static defaultProps ={
        info:{
            name:'이름',
            phone:'010-0000-0000',
            id: 0,
        }
    }

    //수정 버튼이 클릭되면 editing값을 true로 바꾸고 텍스트형식을 input으로 보여줌.
    state = {
        editing:false,
        name: '',
        phone: '',
    }

    //삭제 버튼이 클릭되면 onRemove에 id 넣어서 호출
    handleRemove = () => {
        const {info, onRemove} = this.props;
        onRemove(info.id);
    }
    //editing 값을 반전시키는 함수
    handleToggleEdit = () => {
        const {editing} = this.state;
        this.setState({editing:!editing});
    }
    //input에서 onChange 이벤트가 발생되면 호출되는 함수
    handleChange = (e) => {
        const {name,value} = e.target;
        this.setState({
            [name]:value
        });
    }
    // editing 값이 바뀔 때 처리할 로직이 적혀있음.
    // 수정을 눌렀을 땐, 기존의 값이 input에 나타나고, 
    // 수정을 적용하면 input의 값들을 부모한테 전달해준다.
    componentDidUpdate(prevProps, prevState) {
        const { info, onUpdate} = this.props;
        if(!prevState.editing && this.state.editing) {
            this.setState({
                name:info.name,
                phone:info.phone,
            })
        }
        if(prevState.editing && !this.state.editing){
            onUpdate(info.id, {
                name:this.state.name,
                phone: this.state.phone
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(!this.state.editing
            && !nextState.editing
            && nextProps.info == this.props.info) {
                return false;
            }
        return true;
    }

    render() {
        console.log('render PhoneInfo ' + this.props.info.id);
        const style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        };
        //수정모드
        const { editing } = this.state;
        if(editing) {
            return(
                <div style={style}>
                    <div>
                        <input 
                            value={this.state.name}
                            name="name"
                            placeholder="이름"
                            onChange={this.handleChange} 
                        />
                    </div>
                    <div>
                        <input
                            value={this.state.phone}
                            name="phone"
                            placeholder="전화번호"
                            onChange={this.handleChange}
                        />
                    </div>
                    <button onClick={this.handleToggleEdit}>적용</button>
                    <button onClick={this.handleRemove}>삭제</button>
                </div>
            )
        }
        //일반모드
        const {name,phone,id} = this.props.info; 
        return (
            <div style={style}>
                <div><b>{name}</b></div>
                <div>{phone}</div>
                <button onClick={this.handleToggleEdit}>수정</button>
                <button onClick={this.handleRemove}>삭제</button>
            </div>
        );
    }
}
export default PhoneInfo;