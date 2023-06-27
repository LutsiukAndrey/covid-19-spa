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
import { useContext } from 'react';
import { SidebarContext } from '../../MainContainer';

export const Case = () => {
  const { caseState, setCaseState } = useContext(SidebarContext);
  const { openCaseList } = caseState;

  const handleCaseClick = () => {
    setCaseState(prevState => ({
      ...prevState,
      openCaseList: !prevState.openCaseList,
    }));
  };

  const handleCheckboxChange = name => {
    setCaseState(prevState => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const createCheckbox = (name, label) => (
    <FormControlLabel
      control={
        <Checkbox
          checked={caseState[name]}
          onChange={() => handleCheckboxChange(name)}
        />
      }
      label={label}
    />
  );

  return (
    <>
      <ListItemButton onClick={handleCaseClick}>
        <ListItemIcon>
          <MedicalInformationIcon />
        </ListItemIcon>
        <ListItemText primary="Case" />
        {openCaseList ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={openCaseList} timeout="auto" unmountOnExit>
        <FormGroup>
          {createCheckbox('isConfirmedChecked', 'Confirmed')}
          {createCheckbox('isDeathChecked', 'Death')}
          {createCheckbox('isRecoveredChecked', 'Recovered')}
        </FormGroup>
      </Collapse>
    </>
  );
};
