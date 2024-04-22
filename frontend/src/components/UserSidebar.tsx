import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    
   DocumentIcon,
    InboxIcon,
    
  } from "@heroicons/react/24/solid";
  import { Link } from "react-router-dom";
   
  export function UserSidebar() {
    return (
      <Card className=" fixed h-[calc(100vh-2rem)] w-full max-w-[20rem]   py-4 shadow-xl shadow-blue-gray-900/5 left-0">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            
          </Typography>
        </div>
        <List>
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
           <Link to={"/userdashboard"}>Dashboard</Link> 
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <DocumentIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to={"/addcomplaint"}>Add Complaint</Link> 
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to={"/seecomplaints"}>See Complaint status </Link> 
            <ListItemSuffix>
             
            </ListItemSuffix>
          </ListItem>
          
          
        </List>
      </Card>
    );
  }