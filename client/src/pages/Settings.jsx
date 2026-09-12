import { useCallback, useEffect, useState } from 'react'
import { Stack, Box, Typography, Button, Modal } from '@mui/material';
import { Lock } from 'lucide-react';
import ChangePassword from '../components/ChangePassword';
import {useAuth} from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';
import Loading from '../Loading';

function Settings() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const fetchProfile = useCallback(async () => {
    try{
      const res = await api.get('/profile');
      const profile = res.data;
      if(profile) setProfile(profile)
       
    }catch(error){
      toast.error(error?.response?.data?.error || error.message)
    }finally{
      setLoading(false);
    }
  });

  useEffect(() => {
    fetchProfile();
  },[fetchProfile])

  if(loading) return <Loading />;

  return (

    <Stack sx={{ gap: 3 }}>
      {/* dashboard header */}
      <Box>
        <Typography sx={{
          fontSize: "23px",
          fontWeight: "500"
        }}>Settings</Typography>
        <Typography sx={{
          fontSize: "13px",
          color: "rgb(99, 116, 143)",
          marginTop: "5px"
        }}>Manage your account and prefences</Typography>
      </Box>

      {/* change password card */}
      <Stack sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        width: "300px",
        border: "1px solid rgb(235, 238, 245)",
        borderRadius: "4px",
        p: 4
      }}>

        <Box sx = {{
          background : "rgb(241, 244, 248)",
          borderRadius : "3px",
          p : "8px 10px"
        }}>
        <Lock size={'17'} />
        </Box>
        
        <Box>
          <Typography sx={{
            fontSize: "15px",
            fontWeight: "500"
          }}>Password</Typography>
          <Typography sx={{
            fontSize: "11px",
            color: "rgb(99, 116, 143)",
            marginTop: "5px"
          }}>Update account password</Typography>
        </Box>

        <Button size='small' sx={{
          background: "rgb(255, 254, 254)",
          border: "1px solid rgb(227, 233, 240)",
          borderRadius: "3px",

          fontSize: "12px",
          color: 'black',
          textTransform: "none",
          fontWeight: '300',
          padding: "6px 16px"
        }}
        onClick={() => setOpenChangePassword(true)}>Change</Button>
      </Stack>
      

      {/* change password modal */}

      <Modal
        open={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ChangePassword onClose = {setOpenChangePassword} profile = {profile} />
      </Modal>
      
    </Stack>
  )
}

export default Settings