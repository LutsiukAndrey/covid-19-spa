import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ListItem from '@mui/joy/ListItem';

import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';

import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { nanoid } from 'nanoid';
import { useState } from 'react';

export const Case = ({ onCaseChange }) => {
  const [openCaseList, setOpenCaseList] = useState(false);
  const handleCaseClick = () => {
    setOpenCaseList(!openCaseList);
  };

  return (
    <>
      <ListItemButton key={nanoid()} onClick={handleCaseClick}>
        <ListItemIcon>
          <MedicalInformationIcon />
        </ListItemIcon>
        <ListItemText primary="Case" />
        {openCaseList ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCaseList} timeout="auto" unmountOnExit>
        <RadioGroup
          onChange={e => {
            onCaseChange(e.currentTarget.value);
          }}
          name="case"
          defaultValue="Individual"
        >
          <List
            sx={{
              minWidth: 240,
              '--List-gap': '0.5rem',
              '--ListItem-paddingY': '1rem',
              '--ListItem-radius': '8px',
              '--ListItemDecorator-size': '32px',
            }}
          >
            {['Confirmed', 'Death', 'Recovered'].map(item => (
              <ListItem
                variant="outlined"
                key={item}
                sx={{ boxShadow: 'sm', bgcolor: 'background.body' }}
              >
                <Radio
                  overlay
                  value={item}
                  label={item}
                  sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
                  slotProps={{
                    action: ({ checked }) => ({
                      sx: theme => ({
                        ...(checked && {
                          inset: -1,
                          border: '2px solid',
                          borderColor: theme.vars.palette.primary[500],
                        }),
                      }),
                    }),
                  }}
                />
              </ListItem>
            ))}
          </List>
        </RadioGroup>
      </Collapse>
      ;
    </>
  );
};
