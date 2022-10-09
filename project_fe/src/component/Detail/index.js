import React, {useEffect } from "react";
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import styled from "styled-components";
import AnalysisImage from '../ImgElem/index'
import Img from '../../resource/new_align_0001.jpg'
import Box from '@mui/material/Box';
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { DataGrid} from '@mui/x-data-grid';
import clsx from 'clsx';
import api from '../../api'
import SendIcon from '@mui/icons-material/Send';
const GridContainer =  styled(Grid)`
height:100%;
&>div{
    height:100%;
}
&>div:nth-child(2){
    h2{
        font-size:1rem;
        text-align:left;
    }
    // &>div>div:nth-child(2){
    //     height:100%;
    //     width:100%;
    // }
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

  const sampleResponse = {
    "Original_image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2000&h=2000&q=80",
    "Segmentation_image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1500&h=2000&q=80",
    "Box": {
        "new_align_0361_bbox_1": {
            "box_x": 1195.08,
            "box_y": 855.92,
            "box_width": 109.73,
            "box_height": 214.52
        },
        "new_align_0361_bbox_2": {
            "box_x": 96.74,
            "box_y": 865.18,
            "box_width": 103.54,
            "box_height": 205.72
        }
    },
    "Ratio": {
        "new_align_0361_bbox_1": 84.1234,
        "new_align_0361_bbox_2": 78.5456
    },
    "Margin_list": {
        "new_align_0361_bbox_1": [
            {
                "margin_x": 2290.44,
                "margin_y": 852.98,
                "real_margin": 56.0,
                "margin_ratio": 0.7,
                "margin_width": 107.49
            },
            {
                "margin_x": 2290.44,
                "margin_y": 852.98,
                "real_margin": 56.0,
                "margin_ratio": 0.7,
                "margin_width": 107.49
            },
            {
                "margin_x": 2290.44,
                "margin_y": 852.98,
                "real_margin": 56.0,
                "margin_ratio": 0.7,
                "margin_width": 107.49
            }
        ],
        "new_align_0361_bbox_2": [
            {
                "margin_x": 2290.44,
                "margin_y": 852.98,
                "real_margin": 56.0,
                "margin_ratio": 0.7,
                "margin_width": 107.49
            },
            {
                "margin_x": 2290.44,
                "margin_y": 852.98,
                "real_margin": 56.0,
                "margin_ratio": 0.7,
                "margin_width": 107.49
            }
        ]
    },
    "Cvat_url": "https://cvat.org"
}
  
export default (props) => {
  const { img } = useParams(); 
    const [value, setValue] = React.useState(0);
    const [fromRatio, setFromRatio] = React.useState(83);
    const [toRatio, setToRatio] = React.useState(87);
    const [threshold, setThreshold] = React.useState(85);
    const [analysisBoxList, setAnalysisBoxList] = React.useState([]);
    const [boxList, setBoxList] = React.useState([]);

    const [originImg, setOriginImg] = React.useState(null);
    const [segmentationImg, setSegmentationImg] = React.useState(null);

    const [cvatUrl, setCvatUrl] = React.useState("https://cvat.org");

    const [marginList, setMarginList] = React.useState([]);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [detailID, setDetailId] = React.useState("")

    const columns = [
        { field : "id", headerName : "BoxID", width : 220},
        { field : "mmr", headerName : "MMR", width : 120},
        { field : "status", headerName : "OK/NG", width : 100,
            cellClassName: (params) => {
            if (params.value == null) {
              return '';
            }
      
            return clsx('super-app', {
              OK: params.row.mmr < fromRatio,
              NG: params.row.mmr > toRatio,
              MIDDLE: (params.row.mmr >= fromRatio && params.row.mmr <= toRatio),
            });
            },
            valueGetter: (params) =>`${params.row.mmr<=fromRatio?'OK':'NG'}`
        }
    ];
    
    // const rows = [
    //     {id:1, mmr:0.8799, status:"OK"},
    //     {id:2, mmr:0.6799, status:"NG"},
    //     {id:3, mmr:0.7799, status:"NG"},
    // ];



    const columns_detail = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'margin_width', headerName: '마진폭', width: 130 },
        { field: 'real_margin', headerName: '실마진', width: 130 },
        {
          field: 'margin_ratio',
          headerName: '마진율',
          width: 90,
          valueFormatter: ({ value }) => `${value} %` 
        }
      ];
      
      const componentDidMountApi = async (__img) => {
        try {
            var response = await api.getDetail(__img);
            setCvatUrl(response.data['Cvat_url'])
            setOriginImg(response.data['Original_image'])
            if (response.data['Segmentation_image']) {
                setSegmentationImg(response.data['Segmentation_image'])
            } else {
                setSegmentationImg(response.data['Original_image'])
            }
            let index = [];
            for (let x in response.data['Box']) {
                index.push(x);
            }
            let b = []
            for (let value of index) {
                var ele = {}
                ele.name = value;
                ele.ratio = response.data['Ratio'][value]
                ele.bbox = response.data['Box'][value]
                ele.b_color = 'red'
                b.push(ele)
            };
            setBoxList(b)
            setAnalysisBoxList(b)
        } catch (e) {
            console.log(e)
            setCvatUrl(sampleResponse['Cvat_url'])
            setOriginImg(sampleResponse['Original_image'])
            setSegmentationImg(sampleResponse['Segmentation_image'])
            let index = [];
            for (let x in sampleResponse['Box']) {
                index.push(x);
            }
            let b = []
            for (let value of index) {
                var _ele = {}
                _ele.id = value;
                _ele.mmr = sampleResponse['Ratio'][value]
                // _ele.status = sampleResponse['Ratio'][value]
                _ele.bbox = sampleResponse['Box'][value]
                _ele.b_color = 'red'
                b.push(_ele)
            };
            let margin_list = {}
            for(let item of index){
                let t =[]
                var key=1
                for(let value of sampleResponse['Margin_list'][item]){
                    var _i =value
                    _i.id = key
                    _i.checked = false
                    t.push(_i)
                    key=key+1
                }
                margin_list[item]=t
            }
            setMarginList(margin_list)
            setBoxList(b)
            setAnalysisBoxList(b)
            console.log(b)
        }
    }
    useEffect(() => {
        componentDidMountApi(img)
        return () => {
            componentDidMountApi(img)
        };
    }, [img]);


    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      const handleChangeRatio = (event) => {
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
    const clickCell=(id)=>{
        // setDetailTable(marginList[id])
        setDetailId(id)
        let _selectedRow=[]
        for(let value of marginList[id]){
            if(value.checked){
                _selectedRow.push(value.id)
            }
        }
        setSelectionModel(_selectedRow)
        setValue(1)
    }
    const clickCheckBox=(e)=>{
        let difference = selectionModel.filter(x=> !e.includes(x)).concat(e.filter(x=> !selectionModel.includes(x))).pop()
        let tmp_margin_list = marginList[detailID]
        tmp_margin_list[difference-1].checked=!tmp_margin_list[difference-1].checked
        let origin_margin_list = marginList
        origin_margin_list[detailID] = tmp_margin_list
        setMarginList(origin_margin_list)
        setSelectionModel(e)
        getApiForAnalysis()
    }
    const clickBackTab=()=>{
        setValue(0)
    }
    const getApiForAnalysis = () => {
        var b_list = [...boxList]
        
        for(let ibox of boxList){
            for(let value of marginList[ibox.id]){
                if(value.checked){
                    var ele = {}
                    ele.bbox = {
                        "box_x": value.margin_x,
                        "box_y": value.margin_y,
                        "box_width": value.margin_width,
                        "box_height": 0.1
                    }
                    ele.b_color = 'red'
                    b_list.push(ele)
                }
            }
        }
        setAnalysisBoxList(b_list)
    }

    return (
        <div className='outer-div'>
            <div className='inner-div'>
            <GridContainer container spacing={1}
                 direction="row"
                 justifyContent="space-around"
                 alignItems="center"
                 sx={{padding:'0 16px'}}
                >
                    <Grid item xs={8}>
                        <AnalysisImage  path={Img} img={Img} width={1176} height={820} x={-20} y={-100} scale={0.5} bbox={analysisBoxList}></AnalysisImage>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{width:'100%', height:'82%',textAlign:'left'}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider',marginTop:'0.5rem'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="detail table" >
                    <Tab {...a11yProps(0)} icon={<RefreshIcon />}  disabled={value===1}/>
                    <Tab {...a11yProps(1)} icon={<ArrowBackIosIcon/>} disabled={value===0} onClick={clickBackTab}/>
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Box sx={{
                        width:'100%',height:'40rem',
                        '& .super-app.OK': {
                            backgroundColor: '#3dc0004f',
                            // color: 'rgba(221, 221, 221, 0)',
                            textAlign:'center',
                          },
                          '& .super-app.NG': {
                            backgroundColor: '#ff7300',
                            // color: 'rgba(221, 221, 221, 0)',
                          },
                          '& .super-app.MIDDLE': {
                            backgroundColor: '#ff3300',
                            // color: 'rgba(221, 221, 221, 0)',
                          },
                        }}>
                    <DataGrid
                        rows={boxList}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        onCellClick={(event)=>clickCell(event.id)}
                        // checkboxSelection
                    />
                    </Box>
                </TabPanel>


                <TabPanel value={value} index={1}>
                    <Box sx={{width:'100%',height:'40rem'}}>
                    <DataGrid
                        rows={marginList[detailID]}
                        columns={columns_detail}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        selectionModel={selectionModel}
                        onSelectionModelChange={(e)=>{
                            clickCheckBox(e)
                        }}
                    />
                    </Box>
                </TabPanel>
                        </Box>
                        <Box sx={{width:'100%', height:'18%'}}>
                            <h2>Warning ratio</h2>
                            <form>
                                <div className="value-button" id="decrease" onClick={()=>handleClick("fromRatio",fromRatio-1)}>-</div>
                                <input type="number" id="number"name="fromRatio" value={fromRatio} onChange={handleChangeRatio}/>
                                <span className="percent-tag">%</span>
                                <div className="value-button" id="increase" onClick={()=>handleClick("fromRatio",fromRatio+1)}>+</div>
                                <span>&nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;</span>
                                <div className="value-button" id="decrease" onClick={()=>handleClick("toRatio",toRatio-1)}>-</div>
                                <input type="number" id="number" name="toRatio" value={toRatio} onChange={handleChangeRatio} />
                                <span className="percent-tag">%</span>
                                <div className="value-button" id="increase" onClick={()=>handleClick("toRatio",toRatio+1)}>+</div>
                            </form>
                            <br />
                            <h2>Margin threshold</h2>
                            <form>
                                <div className="value-button" id="decrease" onClick={()=>handleClick("threshold",threshold-1)}>-</div>
                                <input type="number" id="number" name="threshold" value={threshold} onChange={handleChangeRatio} />
                                <span className="percent-tag">%</span>
                                <div className="value-button" id="increase" onClick={()=>handleClick("threshold",threshold+1)}>+</div>
                                <Button variant="contained" endIcon={<SendIcon />} sx={{marginLeft:"50px",marginRight:"10px"}}>
                                Search
                            </Button>
                            </form>
                        </Box>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    );
}