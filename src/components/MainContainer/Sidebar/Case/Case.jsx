import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

export const Case = () => {
  //url
  const [searchParams, setSearchParams] = useSearchParams();
  const updateQueryParam = (name, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);

    setSearchParams(params.toString());
  };

  const queryParams = new URLSearchParams(location.search);
  //url
  const deathParam = queryParams.get('d');
  const recoverParam = queryParams.get('r');
  const confirmParam = queryParams.get('c');

  const [openCaseList, setOpenCaseList] = useState(!false);
  const [isDeath, setIsDeath] = useState(false);
  const [isRecovered, setIsRecovered] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    setIsDeath(deathParam === 'true');
    setIsRecovered(recoverParam === 'true');
    setIsConfirmed(confirmParam === 'true');
  }, [confirmParam, deathParam, recoverParam]);

  return (
    <>
      <ListItemButton onClick={() => setOpenCaseList(!openCaseList)}>
        <ListItemIcon>
          <MedicalInformationIcon />
        </ListItemIcon>
        <ListItemText primary="Case" />
        {openCaseList ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={openCaseList} timeout="auto" unmountOnExit>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={isConfirmed}
                onChange={() => {
                  setIsConfirmed(!isConfirmed);
                  updateQueryParam('c', !isConfirmed);
                }}
              />
            }
            label={'Confirmed'}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isRecovered}
                onChange={() => {
                  setIsRecovered(!isRecovered);
                  updateQueryParam('r', !isRecovered);
                }}
              />
            }
            label={'Recovered'}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={isDeath}
                onChange={() => {
                  setIsDeath(!isDeath);
                  updateQueryParam('d', !isDeath);
                }}
              />
            }
            label={'Death'}
          />
        </FormGroup>
      </Collapse>
    </>
  );
};
