import { Typography } from "@mui/material";
import React from "react";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        style={{ width: '90%', height: 'auto', margin: 'auto', border: '1px solid #EAF2EF', borderRadius: '5px', backgroundColor: '#FBFCFB', boxShadow: '5px 5px 5px -5px #2d2a32', marginBottom: '1rem' }}
      >
        {value === index && (
          <div style={{ padding: '1rem', paddingBottom: '0.5rem' }}>
            <Typography>{children}</Typography>
          </div>
        )}
      </div>
    );
}

export default TabPanel;