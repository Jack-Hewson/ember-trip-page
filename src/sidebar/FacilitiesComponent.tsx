import { Stack, Tooltip } from "@mui/material";
import WcIcon from '@mui/icons-material/Wc';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffTwoToneIcon from '@mui/icons-material/WifiOffTwoTone';
import DesktopTypography from "../commonComponents/DesktopTypography";

const FacilitiesComponent = (route) => {
    return (
        <Stack direction="row" spacing={2}>
            <DesktopTypography text="Facilities" />
            {route?.vehicle?.has_toilet ?
                <Tooltip title="Toilets Available">
                    <WcIcon />
                </Tooltip>
                :
                <Tooltip title="Toilets Unavailable">
                    <WcIcon color="action" />
                </Tooltip>
            }

            {route?.vehicle?.has_wifi ?
                <Tooltip title="Wifi Available">
                    <WifiIcon />
                </Tooltip>
                :
                <Tooltip title="Wifi Unavailable">
                    <WifiOffTwoToneIcon />
                </Tooltip>
            }
        </Stack>
    )
}

export default FacilitiesComponent;