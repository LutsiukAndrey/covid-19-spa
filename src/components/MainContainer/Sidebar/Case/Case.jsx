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
import { useQueryParams } from '../../../../hooks/updateQveryParams';

export const Case = () => {
  const { updateQueryParam } = useQueryParams();

  const [openCaseList, setOpenCaseList] = useState(false);
  const queryParams = new URLSearchParams(location.search);

  const params = {
    death: !queryParams.get('isDeath'),
    recover: !queryParams.get('isRecovered'),
    confirm: !queryParams.get('isConfirmed'),
  };

  useEffect(() => {
    setFilters({
      isDeath: params.death,
      isRecovered: params.recover,
      isConfirmed: params.confirm,
    });
  }, [params.confirm, params.death, params.recover]);

  const [filters, setFilters] = useState({
    isDeath: true,
    isRecovered: true,
    isConfirmed: true,
  });

  const onCheckbox = (e, value) => {
    const { checked } = e.target;

    setFilters(prev => ({ ...prev, [value]: checked }));
    updateQueryParam(value, !checked);
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
