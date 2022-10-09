import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import api from "../../api"
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import styled from "styled-components";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


const steps = ['Login', 'Create an ad group', 'Create an ad']

const Hr = styled.hr`
    background: lightgray;
    margin:2rem 0;
`

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
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
//   const useStyles = makeStyles((theme) => ({
//     root: {
//         backgroundColor: theme.palette.background.paper,
//         width: 500,
//     },
// }));

export default (props) => {
    const [open, setOpen] = React.useState(false);
    // const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [isLogin, setIsLogin] = React.useState(false);

    const handleSubmit = async () => {
        // console.log(this.axios.defaults.headers.common['Authorization'], 'server')
        try {
            if (value === 0) {
                var _id = document.getElementById('Login-Id').value;
                var _password = document.getElementById('Login-Password').value

                var response = await api.signin({
                    id: _id,
                    password: _password
                })
                document.cookie = "access=" + response.data['token'];
                setIsLogin(true)
                setOpen(false)
                // handleSettingOn()
            } else {
                var _token = document.getElementById('SignUp-Token').value

                // if (md5(_token) === root_token) {

                _id = document.getElementById('SignUp-ID').value
                _password = document.getElementById('SignUp-Password').value
                var _nickname = document.getElementById('SignUp-Nickname').value
                var _name = document.getElementById('SignUp-Name').value
                var _email = document.getElementById('SignUp-Email').value


                await api.signup({
                    id: _id,
                    password: _password,
                    nickname: _nickname,
                    name: _name,
                    email: _email
                })
                setOpen(false);
                // }
                // else {
                //     throw new Error("Token error")
                // }
            }
        } catch (error) {

            if (error.message === "Token error") {
                alert(error.message)
            } else {
                console.log(error.response.request.response)
                alert(error.response.request.response)
            }

        }
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const clickLogin = async () => {
        try {
            var _id = document.getElementById('Login-Id').value;
            var _password = document.getElementById('Login-Password').value

            await api.signin({
                id: _id,
                password: _password
            })

            props.propsSetStep(1)

        } catch (error) {
            alert(error)
            props.propsSetStep(1)
        }
    }

    const clickJoin = async () => {
        try {
            var _id = document.getElementById('SignUp-ID').value
            var _password = document.getElementById('SignUp-Password').value
            var _nickname = document.getElementById('SignUp-Nickname').value
            var _name = document.getElementById('SignUp-Name').value
            var _email = document.getElementById('SignUp-Email').value


            await api.signup({
                id: _id,
                password: _password,
                nickname: _nickname,
                name: _name,
                email: _email
            })
            setValue(0)

        } catch (error) {
            alert(error)
        }
    }

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '1rem' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                    <Tab label="로그인" {...a11yProps(0)} />
                    <Tab label="회원가입" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <TextField
                    id="Login-Id"
                    label="ID"
                    type="search"
                    variant="outlined"
                    style={{ margin: 8, width: '20rem' }}
                    fullWidth />
                <br /><br />
                <TextField
                    id="Login-Password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    style={{ margin: 8, width: '20rem' }}
                    fullWidth
                />
                <br /><br />
                <Button variant="contained" size="large" style={{ margin: 8, width: '20rem' }} onClick={clickLogin}>
                    로그인
                </Button>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TextField
                    id="SignUp-ID"
                    label="ID"
                    type="search"
                    variant="outlined"
                    style={{ margin: 8, width: '20rem' }}
                    fullWidth />
                <br />
                <TextField
                    id="SignUp-Password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    style={{ margin: 8, width: '20rem' }}
                    fullWidth
                />
                <br />
                <TextField
                    id="SignUp-Nickname"
                    label="nickname"
                    type="search"
                    variant="outlined"
                    style={{ margin: 8, width: '20rem' }}
                    fullWidth />
                <br />
                <TextField
                    id="SignUp-Name"
                    label="name"
                    type="search"
                    variant="outlined"
                    style={{ margin: 8, width: '20rem' }}
                    fullWidth />
                <br />
                <TextField
                    id="SignUp-Email"
                    label="email"
                    type="search"
                    variant="outlined"
                    style={{ margin: 8, width: '20rem' }}
                    fullWidth />
                <br />
                <Button variant="contained" size="large" style={{ margin: 8, width: '20rem' }} onClick={clickJoin}>
                    Join
                </Button>
            </TabPanel>
        </>
    );
}