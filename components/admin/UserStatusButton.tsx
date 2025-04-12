"use client"
import { Button } from '@/components/ui/button';
import config from '@/lib/config';

interface UserStatusButtonProps {
  userId: string;
  currentStatus: string;
}

const UserStatusButton: React.FC<UserStatusButtonProps> = ({ userId, currentStatus }) => {
  

  const handleClick = async () => {
    console.log("HERERERERER")
    let action = "PENDING"
    if (currentStatus === "PENDING") {
    action = "APPROVED";
    console.log(currentStatus)
    }
    try {
        const res = await fetch(`${config.env.apiEndpoint}/api/admin/users`, {
          method: 'POST',
          body: JSON.stringify({ userId, action }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        const data = await res.json();
        console.log(data)
       if (data.status) {
        currentStatus = data.status;
      }
      } catch (error) {
        console.error('Failed to update user status:', error);
      }
    };
    return (
    <Button onClick={handleClick} className='bg-primary-admin text-light'>
      <div className='text-white'>Modify Status</div>
    </Button>
  );
};

export default UserStatusButton;
