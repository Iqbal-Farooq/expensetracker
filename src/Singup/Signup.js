import React from 'react'

import { useState,useEffect } from 'react'
import {Col,Row,Form,Card,Container,Button} from 'react-bootstrap'

const SignUp=()=>{
    const [email,SetEmail]=useState();
    const [password,setPassword]=useState();
    const[Confirm,SetConfirm]=useState();
    
      const [formIsValid, setFormIsValid] = useState(false);

    //    useEffect(()=>{
    // setFormIsValid(
    //   email.includes('@') &&  password.trim().length>6  && Confirm.trim().length>6
    // );},[email,password,Confirm]);

      const ValidatePassword=(password,Confirmpassword)=>{
       return password===Confirmpassword;
      }
      const EmailInput=(e)=>{
        SetEmail(e.target.value)
        

      }
      const PasswordInput=(e)=>{
        setPassword(e.target.value);
         setFormIsValid(ValidatePassword(e.target.value,Confirm));

      }
     const  updatePasswordInput=(e)=>{
        SetConfirm(e.target.value);
        setFormIsValid(ValidatePassword(password,e.target.value));
     }



     const Submit=(e)=>{
        e.preventDefault();
        if(password===Confirm){
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCy1k8wKuulQHvLB7Ig4fSSsWQ3GJa7q8Y',{
                method:"POST",
                body:JSON.stringify({
                    email:email,
                    password:password,
                    confirmpassword:password,
                     returnSecureToken: true,
                }),
                 headers: {
                 "Content-Type": "application/json",
                   },
            }).then(res=>{ if(res.ok){
                     alert("Success")
                      console.log('success-fully registered')
             } else{
                 return res.json().then(data=>{
                    alert(data.error.message)
                          })}
                        })
        }}

  
    return(
        
        <Row style={{margin:"10% 0 0 20%"}}>
            <Col md={6}>
                <Card>
                    <Card.Header className="p-3" style={{backgroundColor:"darkGrey",textAlign:"center"}}>
                    <h4 >Sign Up</h4>
                    </Card.Header>

                    <Card.Body className="p-5" style={{backgroundColor:"#f7f5f0"}}>
                    <Form>
                     
                         <Form.Group   className="mb-3">
                            <Form.Control size="lg" type="email" placeholder="email" name="email" onChange={EmailInput}  ></Form.Control>
                        </Form.Group>
                         <Form.Group className="mb-3">
                            <Form.Control size="lg" type="password" placeholder="Password" name="password" onChange={PasswordInput} ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control size="lg" type="password" placeholder="Password" name="password" onChange={updatePasswordInput}  ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-1">
                        <Container  style={{textAlign:"center"}}> 
                         <Button  size='lg' variant="success"  type="submit" className='' style={{borderRadius:"40px"}} onClick={Submit} disabled={!formIsValid}>Signup</Button>
                          </Container>
                       
                        </Form.Group>
                    </Form>
                    </Card.Body>
                </Card>
                <Card.Body className="mt-3">
                    <p style={{backgroundColor:"pink",textAlign:"center",padding:"10px"}}>have an account ? Login</p>
                </Card.Body>

            </Col>

        </Row>


    )
}
export default SignUp;