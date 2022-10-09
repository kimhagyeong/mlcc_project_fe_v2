import React, { useRef, useEffect } from "react";
import Box from '@mui/material/Box';
import styled from "styled-components";
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
// import {makeStyles} from 'makeStyles'
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { autoPlay } from 'react-swipeable-views-utils';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Img from '../../resource/new_align_0001.jpg'
import Img2 from '../../resource/new_align_0003.jpg'
import Img3 from '../../resource/new_align_0005.jpg'
import Img4 from '../../resource/new_align_0006.jpg'
import api from '../../api'
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const defaultDate = new Date().toISOString().substring(0, 10);

const ContainerGrid = styled(Grid)`
    height:100%;
    width:100%;
`

const MonitoringStepper = styled(Grid)`
    height: 22rem;
    &>div{
        height:20rem;
        overflow: hidden;
    }
    .MuiMobileStepper-root{
        height: 2rem;
        font-size: 2rem;
        width: 44rem;
        margin: auto;
    }
    img{
        cursor:pointer;
        width: 45rem;
        height:21rem;
        margin:auto;
        transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        color: rgba(0, 0, 0, 0.87);
        border-radius: 10px;
        // box-shadow: rgb(0 0 0 / 20%) 0px 5px 5px -3px, rgb(0 0 0 / 14%) 0px 8px 10px 1px, rgb(0 0 0 / 12%) 0px 3px 14px 2px;
    }
`

const ListContainer = styled(Grid)`
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    color: rgba(0, 0, 0, 0.87);
    border-radius: 10px;
    box-shadow: rgb(0 0 0 / 20%) 0px 5px 5px -3px, rgb(0 0 0 / 14%) 0px 8px 10px 1px, rgb(0 0 0 / 12%) 0px 3px 14px 2px;
    width: 45rem;
    height:18rem;
    flex-basis: auto !important;
    background-color:white;
    & >h2 {
        font-size:1rem;
        margin: 0px;
        // padding-top: 0.5rem;
    }
    & >div{
        width: 43rem;
        height:12.5rem;
        // background-color:#dadada;
        margin:auto;
        border-radius: 10px;
        padding:1rem;
        overflow: auto;
    }
`
const ListDiv = styled.div`
    display: flex;
    cursor:pointer;
    & > div{
        height:35px;
        margin-bottom:10px;
        font-size:30px;
    }
    button{
        width:100%;
        height:100%;
        background-color:${(props) => props.background || "white"}4f;
        text-align: left !important;
        text-overflow: ellipsis;
        white-space: nowrap;
        justify-content: left !important;
    }
    button:hover{
        background-color: ${(props) => props.background || "white"}8f;
    }
    
`
const CustomGrid = styled(Grid)`
    height:8rem;
    color: rgba(0, 0, 0, 0.87);
    background-color:white;
    border-radius: 10px;
    box-shadow: rgb(0 0 0 / 20%) 0px 5px 5px -3px, rgb(0 0 0 / 14%) 0px 8px 10px 1px, rgb(0 0 0 / 12%) 0px 3px 14px 2px;
    flex-basis: auto !important;
    display: flex;
    width: 101.5rem;
    h2 {
        font-size:1rem;
        margin: 0px;
        text-align:left;
    }
    & > div:nth-child(1){
        width:100%;
        height:100%;
        border-right: solid 1px black;
        h2{
            padding: 0.5rem;
            margin-bottom:18px;
        }
        &> div:nth-child(1){
            width:40%;
        }
        &> div:nth-child(2){
            width:40%;
        }
    }
    #date{
        font-size:15px !important;
    }
    & > div:nth-child(2){
        width:100%;
        height:100%;
        border-right: solid 1px black;
        h2{
            padding: 0.5rem;
            margin-bottom:18px;
        }
        &>div{
            width:100%;
            display: inline-block;
            & >div:nth-child(1){
                width:60%;
            }
        }
    }

    & > div:nth-child(3){
        width:100%;
        height:100%;
        border-right: solid 1px black;
        h2{
            padding: 0.5rem;
            margin-bottom:18px;
        }
        &> div{
            width:80%;
        }
    }

    & > div:nth-child(4){
        width:100%;
        height:100%;
        h2{
            padding: 0.5rem;
        }
        border-right: solid 1px black;
    }
    & > div:nth-child(5){
        width:100%;
        height:100%;
        padding-top:15px;
    }
`

const sampleImgList = {
    "Normal": [
        {
            "name": "1",
            "original_image": Img,
            "segmentation_image": Img2,
            "source_pc": "pc5",
            "margin_ratio": 90.2345,
            "created_date": "2022-06-12"
        },
        {
            "name": "2",
            "original_image": Img3,
            "segmentation_image": Img4,
            "source_pc": "pc3",
            "margin_ratio": 90.546,
            "created_date": "2022-06-12"
        }
    ],
    "Error": [
        {
            "name": "3",
            "original_image": Img3,
            "segmentation_image": Img4,
            "source_pc": "pc5",
            "margin_ratio": 78.546,
            "created_date": "2022-06-12"
        },
        {
            "name": "4",
            "original_image": Img,
            "segmentation_image": Img2,
            "source_pc": "pc4",
            "margin_ratio": 86.2345,
            "created_date": "2022-06-12"
        }
    ]
}

export default (props) => {
    const [npc, setNpc] = React.useState('All');
    const [normalList, setNormalList] = React.useState([]);
    const [errorList, setErrorList] = React.useState([]);
    const [originNormalList, setOriginNormalList] = React.useState([]);
    const [originErrorList, setOriginErrorList] = React.useState([]);

    // const classes = useStyles();
    const theme = useTheme();
    const [normalStep, setNormalStep] = React.useState(0);
    const [errorStep, setErrorStep] = React.useState(0);

    const [maxNormalSteps, setMaxNormalSteps] = React.useState(0);
    const [maxErrorSteps, setMaxErrorSteps] = React.useState(0);
    const [fromRatio, setFromRatio] = React.useState(83);
    const [toRatio, setToRatio] = React.useState(87);
    const [threshold, setThreshold] = React.useState(85);

    const [loading, setLoading] = React.useState(true);
    const [success, setSuccess] = React.useState(false);
    function useInterval(callback, delay) {
        const savedCallback = useRef();

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

    useInterval(() => {
        // Your custom logic here
        searchApi()
    }, 600000);

    useEffect(() => {
        componentDidMountApi()
        return () => {
            componentDidMountApi()
        };
    }, []);
    const searchApi = async () => {
        var start_date
        var end_date
        if (document.getElementById('start-date') != null) {
            start_date = document.getElementById('start-date').value.replaceAll('-', '.')
        }

        if (document.getElementById('end-date') != null) {
            end_date = document.getElementById('end-date').value.replaceAll('-', '.')
        }
        try {
            var response = await api.getMainListWithSetting(start_date + '~' + end_date, threshold);
            setOriginNormalList(response.data['Normal'])
            setOriginErrorList(response.data['Error'])
            reorganizedList()
            setMaxNormalSteps(response.data['Normal'].length)
            setMaxErrorSteps(response.data['Error'].length)
        } catch (e) {
            console.log(e)
            setOriginNormalList(sampleImgList['Normal'])
            setOriginErrorList(sampleImgList['Error'])
            setNormalList(sampleImgList['Normal'])
            setErrorList(sampleImgList['Error'])
            setMaxNormalSteps(sampleImgList['Normal'].length)
            setMaxErrorSteps(sampleImgList['Error'].length)
        }
    }
    const componentDidMountApi = async () => {
        try {
            var response = await api.getMainList();
            setOriginNormalList(response.data['Normal'])
            setOriginErrorList(response.data['Error'])
            setNormalList(response.data['Normal'])
            setErrorList(response.data['Error'])
            setMaxNormalSteps(response.data['Normal'].length)
            setMaxErrorSteps(response.data['Error'].length)
        } catch (e) {
            setOriginNormalList(sampleImgList['Normal'])
            setOriginErrorList(sampleImgList['Error'])
            setNormalList(sampleImgList['Normal'])
            setErrorList(sampleImgList['Error'])
            setMaxNormalSteps(sampleImgList['Normal'].length)
            setMaxErrorSteps(sampleImgList['Error'].length)
        }
    }

    const npcHandleChange = (event) => {
        var _npc=event.target.value
        setNpc(_npc);

        var _search=document.getElementById('searchImg').value
        var _errorList = []
        var _normalList = []
        originNormalList.forEach(function (step) {
            if (_npc === 'All') {
                if (step.original_image.search(_search)!==-1) {
                    _normalList.push(step)
                    console.log(step)
                }
            } else {
                if ((step.original_image.search(_search)!==-1) &&( step.source_pc.search(_npc)!==-1)) {
                    _normalList.push(step)
                }
            }
        })

        originErrorList.forEach(function (step) {
            if (_npc === 'All') {
                if (step.original_image.search(_search)!==-1) {
                    _errorList.push(step)
                }
            } else {
                if ((step.original_image.search(_search)!==-1) && (step.source_pc.search(_npc)!==-1)) {
                    _errorList.push(step)
                }
            }

        })
        setErrorList(_errorList)
        setNormalList(_normalList)
    };

    const setWarningColor = (ratio) => {
        if (ratio < fromRatio) {
            return '#3dc000'
        }
        if (ratio >= fromRatio && ratio <= toRatio) {
            return '#ff3300'
        }
        if (ratio > toRatio) {
            return '#ff7300'
        }
    }

    const imgList = (ratio, name, index, propsStep, setStep, label) => {

        return (
            <ListDiv background={setWarningColor(ratio)} key={"List" + label + index} onClick={() => handleClickList(index, setStep)}>
                <Grid item xs={1}>
                    {propsStep === index ? <ArrowRightAltIcon /> : null}
                </Grid>
                <Grid item xs={11}>
                    <Button variant="primary" >{name.substring(name.lastIndexOf('/') + 1, name.length)}</Button>
                </Grid>
            </ListDiv>
        )
    };

    const handleClickList = (index, setStep) => {
        setStep(index);
    }

    const handleNormalNext = () => {
        setNormalStep((prevNormalStep) => prevNormalStep + 1);
    };

    const handleNormalBack = () => {
        setNormalStep((prevNormalStep) => prevNormalStep - 1);
    };

    const handleErrorNext = () => {
        setErrorStep((prevErrorStep) => prevErrorStep + 1);
    };

    const handleErrorBack = () => {
        setErrorStep((prevErrorStep) => prevErrorStep - 1);
    };


    const handleChange = (event) => {
        // input value 가져오기
        const { name, value } = event.target;
        switch (name) {
            case "fromRatio":
                if (value >= 0 && value < toRatio) {
                    setFromRatio(value);
                } else {
                    document.querySelector('input[name="fromRatio"]').value = fromRatio;
                }
                break;
            case "toRatio":
                if (value <= 100 && value > fromRatio) {
                    setToRatio(value);
                } else {
                    document.querySelector('input[name="toRatio"]').value = toRatio;
                }
                break;
            case "threshold":
                if (value >= 0 && value <= 100) {
                    setThreshold(value);
                } else {
                    document.querySelector('input[name="threshold"]').value = threshold;
                }
                break;
            default:
                console.log("error!");
        }
    };

    const handleClick = (target, value) => {
        
        switch (target) {
            case "fromRatio":
                if (value >= 0 && value < toRatio) {
                    setFromRatio(value);
                } else {
                    document.querySelector('input[name="fromRatio"]').value = fromRatio;
                }
                break;
            case "toRatio":
                if (value <= 100 && value > fromRatio) {
                    setToRatio(value);
                } else {
                    document.querySelector('input[name="toRatio"]').value = toRatio;
                }
                break;
            case "threshold":
                if (value >= 0 && value <= 100) {
                    setThreshold(value);
                } else {
                    document.querySelector('input[name="threshold"]').value = threshold;
                }
                break;
            default:
                console.log("error!");
        }
    };
    const handleSearch = () => {
        searchApi()
    }

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700]
            },
        }),
    };

    const reorganizedList = () => {
        var _search=document.getElementById('searchImg').value
        var _errorList = []
        var _normalList = []
        originNormalList.forEach(function (step) {
            if (npc === 'All') {
                if (step.original_image.search(_search)!==-1) {
                    _normalList.push(step)
                    console.log(step)
                }
            } else {
                if ((step.original_image.search(_search)!==-1) &&( step.source_pc.search(npc)!==-1)) {
                    _normalList.push(step)
                }
            }
        })

        originErrorList.forEach(function (step) {
            if (npc === 'All') {
                if (step.original_image.search(_search)!==-1) {
                    _errorList.push(step)
                }
            } else {
                if ((step.original_image.search(_search)!==-1) && (step.source_pc.search(npc)!==-1)) {
                    _errorList.push(step)
                }
            }

        })
        setErrorList(_errorList)
        setNormalList(_normalList)
    }

    return (
        <div className='outer-div'>
            <div className='inner-div'>


                <ContainerGrid container
                    spacing={0}
                    direction="row"
                    justifyContent="center"
                    alignItems="center" >

                    <MonitoringStepper item xs={6}>
                        <AutoPlaySwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={normalStep}
                            // onChangeIndex={handleStepChange}
                            enableMouseEvents
                        >
                            {normalList.map((step, index) => (
                                <div key={"normalStepDiv" + index}>
                                    {Math.abs(normalStep - index) <= 2 ? (
                                        <img src={step.original_image} alt={step.label} key={"normalStepImg" + step.name} onClick={() => window.location.href = '/detail/' + step.name} />
                                    ) : null}
                                </div>
                            ))}
                        </AutoPlaySwipeableViews>
                        <MobileStepper
                            steps={maxNormalSteps}
                            position="static"
                            variant="text"
                            activeStep={normalStep}
                            nextButton={
                                <Button size="small" onClick={handleNormalNext} disabled={normalStep === maxNormalSteps - 1}>
                                    Next
                                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                </Button>
                            }
                            backButton={
                                <Button size="small" onClick={handleNormalBack} disabled={normalStep === 0}>
                                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                    Back
                                </Button>
                            }
                        />
                    </MonitoringStepper>


                    <MonitoringStepper item xs={6}>
                        <AutoPlaySwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={errorStep}
                            // onChangeIndex={handleStepChange}
                            enableMouseEvents
                        >
                            {errorList.map((step, index) => (
                                <div key={"errorStepDiv" + step.original_img}>
                                    {Math.abs(errorStep - index) <= 2 ? (
                                        <img src={step.original_image} alt={step.label} key={"errorStepImg" + step.name} onClick={() => window.location.href = '/detail/' + step.name} />
                                    ) : null}
                                </div>
                            ))}
                        </AutoPlaySwipeableViews>
                        <MobileStepper
                            steps={maxErrorSteps}
                            position="static"
                            variant="text"
                            activeStep={errorStep}
                            nextButton={
                                <Button size="small" onClick={handleErrorNext} disabled={errorStep === maxErrorSteps - 1}>
                                    Next
                                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                </Button>
                            }
                            backButton={
                                <Button size="small" onClick={handleErrorBack} disabled={errorStep === 0}>
                                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                    Back
                                </Button>
                            }
                        />
                    </MonitoringStepper>

                    <ListContainer item xs={6} style={{ margin: "0 auto 0 auto" }}>
                        <h2>양품(Normal)</h2>
                        <div>{normalList.map((Element, index) => (imgList(Element.margin_ratio, Element.original_image, index, normalStep, setNormalStep, 'normal')))}</div>
                    </ListContainer>

                    <ListContainer item xs={6} style={{ margin: "0 auto 0 auto" }}>
                        <h2>불량(Error)</h2>
                        <div>{errorList.map((Element, index) => (imgList(Element.margin_ratio, Element.original_image, index, errorStep, setErrorStep, 'error')))}</div>
                    </ListContainer>


                    <CustomGrid item xs={12}>
                        <Grid item xs={3}>
                            <h2>Monitoring period</h2>
                            <TextField
                                className="admin-setting"
                                id="start-date"
                                label="Start Date"
                                type="date"
                                defaultValue={defaultDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            &nbsp;  &nbsp;
                            <TextField
                                className="admin-setting"
                                id="end-date"
                                label="End Date"
                                type="date"
                                defaultValue={defaultDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={1}>
                            <h2>PC Number</h2>
                            <FormControl variant="standard">
                                <Select
                                    className="admin-setting"
                                    labelId="npc"
                                    id="npc"
                                    value={npc}
                                    label="npc"
                                    onChange={npcHandleChange}
                                >
                                    <MenuItem value={"All"}>All</MenuItem>
                                    <MenuItem value={"pc1"}>pc1</MenuItem>
                                    <MenuItem value={"pc2"}>pc2</MenuItem>
                                    <MenuItem value={"pc3"}>pc3</MenuItem>
                                    <MenuItem value={"pc4"}>pc4</MenuItem>
                                    <MenuItem value={"pc5"}>pc5</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <h2>Image Name</h2>
                            <TextField id="searchImg" label="Enter를 누르면 검색됩니다" variant="outlined" onKeyPress={(event) => { if (event.key === 'Enter') reorganizedList() }} />
                        </Grid>

                        <Grid item xs={4}>

                            <h2>Warning ratio</h2>

                            <form>
                                <div className="value-button" id="decrease" onClick={()=>handleClick("fromRatio",fromRatio-1)}>-</div>
                                <input type="number" id="number"name="fromRatio" value={fromRatio} onChange={handleChange}/>
                                <span className="percent-tag">%</span>
                                <div className="value-button" id="increase" onClick={()=>handleClick("fromRatio",fromRatio+1)}>+</div>
                                <span>&nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;</span>
                                <div className="value-button" id="decrease" onClick={()=>handleClick("toRatio",toRatio-1)}>-</div>
                                <input type="number" id="number" name="toRatio" value={toRatio} onChange={handleChange} />
                                <span className="percent-tag">%</span>
                                <div className="value-button" id="increase" onClick={()=>handleClick("toRatio",toRatio+1)}>+</div>
                            </form>
                            <br />
                            <h2>Margin threshold</h2>
                            <form>
                                <div className="value-button" id="decrease" onClick={()=>handleClick("threshold",threshold-1)}>-</div>
                                <input type="number" id="number" name="threshold" value={threshold} onChange={handleChange} />
                                <span className="percent-tag">%</span>
                                <div className="value-button" id="increase" onClick={()=>handleClick("threshold",threshold+1)}>+</div>
                            </form>

                        </Grid>

                        <Grid item xs={1}>
                            {/* <SettingsIcon sx={{fontSize:40}}  color="action"  onClick={() => window.location.href = '/setting'}></SettingsIcon> */}
                            <Box sx={{ m: 1, position: 'relative' }}>
                                <Button
                                    variant="contained"
                                    sx={buttonSx}
                                    endIcon={<SettingsIcon />}
                                    onClick={() => window.location.href = '/setting'}
                                >
                                    자가학습
                                </Button>
                                {loading && (
                                    <CircularProgress
                                        size={24}
                                        sx={{
                                            color: green[500],
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            marginTop: '-12px',
                                            marginLeft: '-12px',
                                        }}
                                    />
                                )}
                            </Box>
                            <Button variant="contained" endIcon={<SendIcon />}>
                                Search
                            </Button>
                        </Grid>
                    </CustomGrid>


                </ContainerGrid>


            </div>
        </div>
    );
}