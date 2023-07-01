import React, { useEffect, useState } from 'react';
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
import { useQueryParams } from '../../../../hooks/updateQveryParams';

interface Filters {
  isDeath: boolean;
  isRecovered: boolean;
  isConfirmed: boolean;
}

export const Case: React.FC = () => {
  const { updateQueryParam } = useQueryParams();

  const [openCaseList, setOpenCaseList] = useState(false);
  const queryParams = new URLSearchParams(location.search);

  const params = {
    death: !queryParams.get('isDeath') as boolean,
    recover: !queryParams.get('isRecovered') as boolean,
    confirm: !queryParams.get('isConfirmed') as boolean,
  };

  const [filters, setFilters] = useState<Filters>({
    isDeath: true,
    isRecovered: true,
    isConfirmed: true,
  });

  useEffect(() => {
    setFilters({
      isDeath: params.death,
      isRecovered: params.recover,
      isConfirmed: params.confirm,
    });
  }, [params.confirm, params.death, params.recover]);

  const onCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: keyof Filters
  ) => {
    const { checked } = e.target;

    setFilters(prev => ({ ...prev, [value]: checked }));
    !checked ? updateQueryParam(value, 'false') : updateQueryParam(value, null);
  };

  return (
    <>
      <ListItemButton onClick={() => setOpenCaseList(prev => !prev)}>
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
                value="isConfirmed"
                checked={filters.isConfirmed}
                onChange={e => onCheckbox(e, 'isConfirmed')}
              />
            }
            label="Confirmed"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="isRecovered"
                checked={filters.isRecovered}
                onChange={e => onCheckbox(e, 'isRecovered')}
              />
            }
            label="Recovered"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="isDeath"
                checked={filters.isDeath}
                onChange={e => onCheckbox(e, 'isDeath')}
              />
            }
            label="Death"
          />
        </FormGroup>
      </Collapse>
    </>
  );
};
