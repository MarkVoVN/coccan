import React from "react";

function ProfilePage({ params }: { params: { uid: string } }) {
  return <div>ProfilePage of {params.uid}</div>;
}

export default ProfilePage;
