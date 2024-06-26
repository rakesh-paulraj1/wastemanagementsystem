import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    MapIcon,
  } from "@heroicons/react/24/solid";
  import { Link } from "react-router-dom";
   
  export function AdminSidebar() {
    return (
      <Card className=" fixed h-[calc(100vh-2rem)] w-full max-w-[20rem]   py-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            
          </Typography>
        </div>
        <List>
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
           <Link to={"/admindashboard"}>Dashboard</Link> 
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to={"/adduser"}>Add new User</Link> 
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to={"/allcomplaints"}>Complaints</Link> 
            <ListItemSuffix>
             
            </ListItemSuffix>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <MapIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to={"/allareas"}>Areas</Link>
          </ListItem>
          
          
        </List>
      </Card>
    );
  }