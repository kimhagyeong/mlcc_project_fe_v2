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
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AnalysisImage from '../ImgElem/index_small'
import Img from '../../resource/new_align_0001.jpg'

const BoxM =  styled(Box)`
text-align: left;
padding: 15px 20%;
font-weight: bold;
button{
    margin-top: -6px;
    margin-left:1rem;
}

&>span:nth-child(2){
    float:right;
}

`
const CardBox = styled(Card)`
svg{
    margin-top: 5px;
    margin-right: 10px;
}
& > div:nth-child(1){
    padding-bottom:0;

 }
`
const CardContentDiv = styled(Box)`
width:100%;
height:18rem;
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
                <BoxM sx={{ borderBottom: 1, borderColor: 'divider',marginTop:'1rem',marginBottom:'1rem'}}>
                    <span>이미지 선택</span> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                    <FormControl sx={{ minWidth: 100, marginTop:'-5px' }} variant="standard">
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="image"
                            >
                                <MenuItem value={"0"}>Random</MenuItem>
                                <MenuItem value={"1"}>1</MenuItem>
                                <MenuItem value={"2"}>2</MenuItem>
                                <MenuItem value={"3"}>3</MenuItem>
                                <MenuItem value={"4"}>4</MenuItem>
                                <MenuItem value={"5"}>5</MenuItem>
                                <MenuItem value={"6"}>6</MenuItem>
                                <MenuItem value={"7"}>7</MenuItem>
                                <MenuItem value={"8"}>8</MenuItem>
                                <MenuItem value={"9"}>9</MenuItem>
                                <MenuItem value={"10"}>10</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            size="small">
                            학습 결과
                            </Button>

                            <Box sx={{display:'inline-block',float:'right'}}>
                            <span>모델 선택</span> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                    <FormControl sx={{ minWidth: 100, marginTop:'-5px' }} variant="standard">
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="image"
                            >
                                <MenuItem value={"1"}>Model1</MenuItem>
                                <MenuItem value={"2"}>Model2</MenuItem>
                                <MenuItem value={"3"}>Model3</MenuItem>
                                <MenuItem value={"4"}>Model4</MenuItem>
                                <MenuItem value={"5"}>Model5</MenuItem>
                                <MenuItem value={"6"}>Model6</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            size="small">
                            변경하기
                            </Button>
                            </Box>
                </BoxM>
                <Grid container spacing={1}
                 direction="row"
                 justifyContent="space-around"
                 alignItems="center"
                 sx={{padding:'0 16px'}}
                >
                    <Grid item xs={4}>
                        <CardBox sx={{ maxWidth: "100%" }}>
                            <CardHeader
                                title="Model1"
                                action={
                                    <CheckCircleIcon/>
                                }
                            />
                            <CardContent >
                                <CardContentDiv>
                                    <AnalysisImage  path={Img} img={Img} width={552} height={288} x={7} y={-50} scale={0.22}></AnalysisImage>
                                </CardContentDiv>
                            </CardContent>
                        </CardBox>
                    </Grid>

                    <Grid item xs={4}>
                        <CardBox sx={{ maxWidth: "100%" }}>
                            <CardHeader
                                title="Model2"
                            />
                            <CardContent >
                                <CardContentDiv>
                                <AnalysisImage  path={Img} img={Img} width={552} height={288} x={7} y={-50} scale={0.22}></AnalysisImage>
                                </CardContentDiv>
                            </CardContent>
                        </CardBox>
                    </Grid>

                    <Grid item xs={4}>
                        <CardBox sx={{ maxWidth: "100%" }}>
                            <CardHeader
                                title="Model3"
                            />
                            <CardContent >
                                <CardContentDiv>
                                <AnalysisImage  path={Img} img={Img} width={552} height={288} x={7} y={-50} scale={0.22}></AnalysisImage>

                                </CardContentDiv>
                            </CardContent>
                        </CardBox>
                    </Grid>

                    <Grid item xs={4}>
                        <CardBox sx={{ maxWidth: "100%" }}>
                            <CardHeader
                                title="Model4"
                            />
                            <CardContent >
                                <CardContentDiv></CardContentDiv>
                            </CardContent>
                        </CardBox>
                    </Grid>

                    <Grid item xs={4}>
                        <CardBox sx={{ maxWidth: "100%" }}>
                            <CardHeader
                                title="Model5"
                            />
                            <CardContent >
                                <CardContentDiv></CardContentDiv>
                            </CardContent>
                        </CardBox>
                    </Grid>

                    <Grid item xs={4}>
                        <CardBox sx={{ maxWidth: "100%" }}>
                            <CardHeader
                                title="Model6"
                            />
                            <CardContent >
                                <CardContentDiv></CardContentDiv>
                            </CardContent>
                        </CardBox>
                    </Grid>
                </Grid>
                {/* <Box sx={{width:'100%',height:'47rem', padding:'0 2%', direction:'row', justifyContent:'space-between',alignItems:'center'}}>
                    <CardBox sx={{ maxWidth: "30%" }}>
                        <CardHeader
                            title="Model1"
                            action={
                                <CheckCircleIcon/>
                            }
                        />
                        <CardContent >
                            <CardContentDiv></CardContentDiv>
                        </CardContent>
                    </CardBox>
                    <CardBox sx={{ maxWidth: "30%" }}>
                        <CardHeader
                            title="Model1"
                            action={
                                <CheckCircleIcon/>
                            }
                        />
                        <CardContent >
                            <CardContentDiv></CardContentDiv>
                        </CardContent>
                    </CardBox>
                    
                </Box> */}
            </>
    );
}