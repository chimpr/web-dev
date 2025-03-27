import React, { useState, useEffect } from 'react';
import '../styles/student.css';
import StudentImage from '../images/Studentmonkey.png';

interface StudentData {
  FirstName: string;
  LastName: string;
  School: string;
  Grad_Semester: string;
  Grad_Year: number;
  Bio: string;
  Email: string;
}

const StudentProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [studentData, setStudentData] = useState<StudentData>({
    FirstName: '',
    LastName: '',
    School: '',
    Grad_Semester: '',
    Grad_Year: 0,
    Bio: '',
    Email: ''
  });

  // example data for now 
  useEffect(() => {
    const fetchData = async () => {
      const mockData = {
        FirstName: 'Alice',
        LastName: 'Smith',
        School: 'University of XYZ',
        Grad_Semester: 'Spring',
        Grad_Year: 2025,
        Bio: 'Interested in software development...',
        Email: 'example@gmail.com'
      };
      setStudentData(mockData);
    };
    
    fetchData();
  }, []);


// Add API 
  const handleSave = () => {
    setIsEditing(false);
    
  };

  return (
    <div className="student-container">
      {/* Left Card Section */}
      <div className="profile-card">
        <h1 className="student-title">Welcome to the student portal</h1>
        <img src={StudentImage} alt="Student Portal" className="student-image" />
  
        <div className="form-container">
          {/* Keep all existing form groups */}
          <div className="form-group">
          <label>Name:</label>
          {isEditing ? (
            <div className="name-inputs">
              <input
                value={studentData.FirstName}
                onChange={(e) => setStudentData({...studentData, FirstName: e.target.value})}
                className="student-input"
              />
              <input
                value={studentData.LastName}
                onChange={(e) => setStudentData({...studentData, LastName: e.target.value})}
                className="student-input"
              />
            </div>
          ) : (
            <span className="student-info">{`${studentData.FirstName} ${studentData.LastName}`}</span>
          )}
        </div>
        <div className="form-group">
          <label>School:</label>
          {isEditing ? (
            <input
              value={studentData.School}
              onChange={(e) => setStudentData({...studentData, School: e.target.value})}
              className="student-input"
            />
          ) : (
            <span className="student-info">{studentData.School}</span>
          )}
        </div>

        <div className="form-group">
          <label>Graduation:</label>
          {isEditing ? (
            <div className="graduation-inputs">
              <select
                value={studentData.Grad_Semester}
                onChange={(e) => setStudentData({...studentData, Grad_Semester: e.target.value})}
                className="student-input"
              >
                <option value="Spring">Spring</option>
                <option value="Fall">Fall</option>
                <option value="Summer">Summer</option>
              </select>
              <input
                type="number"
                value={studentData.Grad_Year}
                onChange={(e) => setStudentData({...studentData, Grad_Year: parseInt(e.target.value)})}
                className="student-input"
              />
            </div>
          ) : (
            <span className="student-info">{`${studentData.Grad_Semester} ${studentData.Grad_Year}`}</span>
          )}
        </div>

        <div className="form-group">
          <label>Bio:</label>
          {isEditing ? (
            <textarea
              value={studentData.Bio}
              onChange={(e) => setStudentData({...studentData, Bio: e.target.value})}
              className="student-textarea"
            />
          ) : (
            <span className="student-info">{studentData.Bio}</span>
          )}
        </div>
        <button 
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="student-button"
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>
    </div>

    {/* Right Space Reserved */}
    <div className="right-space"></div>
  </div>
);
};

export default StudentProfile;