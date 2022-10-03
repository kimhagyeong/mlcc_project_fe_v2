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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import PauseIcon from '@mui/icons-material/Pause';
import FileOpenIcon from '@mui/icons-material/FileOpen';


const steps = ['Login', 'Create an ad group', 'Create an ad']

const BoxM =  styled(Box)`
text-align: left;
h1{
    color: green;
}
    
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
    const [loading, setLoading] = React.useState(true);
    const [success, setSuccess] = React.useState(false);


    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

    return (
        <>
                <Box sx={{ borderBottom: 1, borderColor: 'divider',marginTop:'1rem',marginBottom:'5rem'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                    <Tab label="자가학습 세팅" {...a11yProps(0)} />
                    </Tabs>
                </Box>
                <BoxM sx={{width:'30%', margin:'auto'}}>
                    <h3>자가학습 수행</h3>
                    <p>자가학습 시작을 누르면 모든 검사 기능을 중지하고 자가학습을 시작합니다. <br/> 예상 소요 시간은 약 1hour 입니다.</p>
                    <br/>
                    <FormControl sx={{ minWidth: 300 }}>
                            <Select
                                labelId="ratio"
                                id="ratio"
                                label="%"
                            >
                                <MenuItem value={"50"}>50</MenuItem>
                                <MenuItem value={"75"}>75</MenuItem>
                                <MenuItem value={"100"}>100</MenuItem>
                                <MenuItem value={"125"}>125</MenuItem>
                                <MenuItem value={"150"}>150</MenuItem>
                            </Select>
                        </FormControl>
                        <br/><br/>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        
                        <Box sx={{ m: 1, position: 'relative',margin: '0 50px 0 0' }}>
                            <Button
                            variant="contained"
                            sx={buttonSx}
                            disabled={loading}
                            //   onClick={handleButtonClick}
                            size="large"
                            >
                            자가학습 시작
                            </Button>
                            
                        </Box>

                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Fab
                            aria-label="save"
                            color="error"
                            sx={buttonSx}
                            //   onClick={handleButtonClick}
                            >
                            {success ?  null: <PauseIcon />}
                            </Fab>
                            {loading && (
                            <CircularProgress
                                size={68}
                                sx={{
                                color: green[500],
                                position: 'absolute',
                                top: -6,
                                left: -6,
                                zIndex: 1,
                                }}
                            />
                            )}
                        </Box>
                        </Box>

                        <br/><br/><br/>
                        <h3>현재 모델</h3>
                        <h1>" Auto "</h1>
                        <Button
                            variant="contained"
                            size="large"
                            endIcon={<FileOpenIcon/>}
                            onClick={()=>props.propsSetStep(2)}
                            >
                            모델 변경하기
                            </Button>
                </BoxM>
            </>
    );
}