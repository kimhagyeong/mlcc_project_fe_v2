import React, { useState, useRef, useEffect } from "react";
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
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DataGrid, GridRowsProp, GridColDef  } from '@mui/x-data-grid';
import clsx from 'clsx';

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


  
export default (props) => {
    const [value, setValue] = React.useState(1);

    const columns = [
        { field : "id", headerName : "BoxID", width : 150},
        { field : "mmr", headerName : "MMR", width : 200},
        { field : "status", headerName : "OK/NG", width : 120,
            cellClassName: (params) => {
            if (params.value == null) {
              return '';
            }
      
            return clsx('super-app', {
              OK: params.value === 'OK',
              NG: params.value === 'NG',
            });
            }
        }
    ];
    
    const rows = [
        {id:1, mmr:0.8799, status:"OK"},
        {id:2, mmr:0.6799, status:"NG"},
        {id:3, mmr:0.7799, status:"NG"},
        {id:4, mmr:0.8599, status:"OK"},
        {id:5, mmr:0.8199, status:"OK"},
        {id:6, mmr:0.8739, status:"OK"},
        {id:7, mmr:0.7259, status:"NG"},
        {id:8, mmr:0.8794, status:"OK"},
        {id:9, mmr:0.5798, status:"NG"},
        {id:10, mmr:0.8499, status:"OK"},
        {id:11, mmr:0.6799, status:"NG"},
        {id:12, mmr:0.779, status:"NG"},
        {id:13, mmr:0.8569, status:"OK"},
        {id:14, mmr:0.8199, status:"OK"},
        {id:15, mmr:0.8199, status:"OK"},
    ];



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
      
      const rows_detail = [
        { id: 1, margin_width: 48, real_margin: 44, margin_ratio: 60 },
        { id: 2, margin_width: 48, real_margin: 40, margin_ratio: 35 },
        { id: 3, margin_width: 48, real_margin: 38, margin_ratio: 35 },
        { id: 4, margin_width: 40, real_margin: 38, margin_ratio: 45 },
        { id: 5, margin_width: 38, real_margin: 38, margin_ratio: 35 },
        { id: 6, margin_width: 38, real_margin: 30, margin_ratio: 70 },
        { id: 7, margin_width: 36, real_margin: 30, margin_ratio: 35 },
        { id: 8, margin_width: 40, real_margin: 38, margin_ratio: 100 },
        { id: 9, margin_width: 36, real_margin: 36, margin_ratio: 100 },
      ];
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

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
                        <AnalysisImage  path={Img} img={Img} width={1176} height={820} x={-20} y={-100} scale={0.5}></AnalysisImage>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{width:'100%', height:'82%',textAlign:'left'}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider',marginTop:'0.5rem'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="detail table" >
                    <Tab {...a11yProps(0)} icon={<RefreshIcon />}/>
                    <Tab {...a11yProps(1)} icon={<ArrowBackIosIcon/>} disabled={true}/>
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Box sx={{
                        width:'100%',height:'40rem',
                        '& .super-app.OK': {
                            backgroundColor: '#b7ee8a',
                            color: '#1a3e72',
                            fontWeight: '600',
                            textAlign:'center',
                          },
                          '& .super-app.NG': {
                            backgroundColor: '#d47483',
                            color: '#1a3e72',
                            fontWeight: '600',
                          },
                        }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        // checkboxSelection
                    />
                    </Box>
                </TabPanel>


                <TabPanel value={value} index={1}>
                    <Box sx={{width:'100%',height:'40rem'}}>
                    <DataGrid
                        rows={rows_detail}
                        columns={columns_detail}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                    />
                    </Box>
                </TabPanel>
                        </Box>
                        <Box sx={{width:'100%', height:'18%'}}>
                            <h2>Warning ratio</h2>
                            <form>
                            <div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
                            <input type="number" id="number" value="0" />
                            <span class="percent-tag">%</span>
                            <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div>
                            <span>&nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;</span>
                            <div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
                            <input type="number" id="number" value="0" />
                            <span class="percent-tag">%</span>
                            <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div>
                            </form>
                            <br/>
                            <h2>Margin threshold</h2>
                            <form>
                            <div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
                            <input type="number" id="number" value="0" />
                            <span class="percent-tag">%</span>
                            <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div>
                            </form>
                        </Box>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    );
}