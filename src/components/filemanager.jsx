import { useEffect } from 'react';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import { Storage } from 'aws-amplify';
export const FileManager = () => {

    useEffect(() => {
        getUserPrivateFiles('myFileKey', 'myUserIdentityId');
    }, [])

    const getUserPrivateFiles = async (userObjectkey, userIdentityId) => {
        try {
            const result = await Storage.get(userObjectkey, {
                identityId: userIdentityId,
                level: 'private'
            })
            // do something with `result`
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        <h2>Files</h2>
        <StorageManager
            acceptedFileTypes={['image/*']}
            accessLevel="private"
            maxFileCount={1}
            isResumable
        />
    </div>
  );
};