import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import WestIcon from "@mui/icons-material/West";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Outlet } from "react-router-dom";
import { Paper } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AboutIcon from "@mui/icons-material/DragHandleRounded";
import SkillsIcon from "@mui/icons-material/NoteAltRounded";
import AchievementIcon from "@mui/icons-material/EmojiEventsRounded";
import PermContactCalendarRoundedIcon from "@mui/icons-material/PermContactCalendarRounded";

const drawerWidth = 240;

type AppDrawerList = {
  icon: React.ReactNode;
  label: string;
};
const appDrawerList: AppDrawerList[] = [
  {
    icon: <HomeRoundedIcon />,
    label: "Home",
  },
  {
    icon: <AboutIcon />,
    label: "About",
  },
  {
    icon: <SkillsIcon />,
    label: "Skills",
  },
  {
    icon: <AchievementIcon />,
    label: "Achievement",
  },
  {
    icon: <PermContactCalendarRoundedIcon />,
    label: "Contact us",
  },
];

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(0),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function MainPage() {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleDrawerOpenAndClose = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpenAndClose}
            edge="start"
          >
            {open ? <WestIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6">Rajkumar Rathod </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth - 8,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            mt: "8vh",
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <List>
          {appDrawerList.map((item) => (
            <ListItem
              key={item.label}
              disablePadding
              sx={{ display: "flex", gap: "10px", ml: "1em" }}
            >
              {item.icon}
              <ListItemButton>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main
        open={open}
        sx={{
          p: 5,
          height: "100%",
          width: "100%",
          bgcolor: "#98AFC7",
        }}
      >
        <Paper elevation={3} sx={{ mt: 6, height: "95%", width: "100%" }}>
          <Outlet />
        </Paper>
      </Main>
    </Box>
  );
}
