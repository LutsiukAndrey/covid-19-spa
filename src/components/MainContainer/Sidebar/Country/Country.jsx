import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import PublicIcon from '@mui/icons-material/Public';

import { useState } from 'react';
import { nanoid } from 'nanoid';

export const Country = ({ regions, onCountryChange }) => {
  const [openCountryList, setOpenCountryList] = useState(false);
  const handleCountryClick = () => {
    setOpenCountryList(!openCountryList);
  };
  return (
    <>
      <ListItemButton key={nanoid()} onClick={handleCountryClick}>
        <ListItemIcon>
          <PublicIcon />
        </ListItemIcon>
        <ListItemText primary="Country" />
        {openCountryList ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCountryList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {regions ? (
            regions.map(({ iso, name }) => {
              return (
                <ListItemButton
                  key={nanoid()}
                  id={iso}
                  sx={{ pl: 4 }}
                  onClick={e => {
                    onCountryChange(e.currentTarget.id);
                  }}
                >
                  <ListItemText primary={name} />
                </ListItemButton>
              );
            })
          ) : (
            <></>
          )}
        </List>
      </Collapse>
    </>
  );
};
