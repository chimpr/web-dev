import React from 'react';
import './styles/student.css';
import StudentImage from './images/Studentmonkey.png';
import Student from '../../models/Student';

interface StudentProfileViewProps {
    isEditing: boolean;
    studentData: Student;
    onEditToggle: () => void;
    onSave: () => void;
    onDataChange: (data: Student) => void;
}

const StudentProfileView: React.FC<StudentProfileViewProps> = ({
    isEditing,
    studentData,
    onEditToggle,
    onSave,
    onDataChange,
}) => {
    const handleChange = (field: keyof Student, value: string | number) => {
        onDataChange({ ...studentData, [field]: value });
    };

    return (
        <div className="student-container">
            <div className="profile-card">
                <h1 className="student-title">Welcome to the student portal</h1>
                <img src={StudentImage} alt="Student Portal" className="student-image" />
                <div className="form-group">
                    <label>Name:</label>
                    {isEditing ? (
                        <div className="name-inputs">
                            <input
                                value={studentData.firstName}
                                onChange={(e) => handleChange('firstName', e.target.value)}
                                className="student-input"
                            />
                            <input
                                value={studentData.lastName}
                                onChange={(e) => handleChange('lastName', e.target.value)}
                                className="student-input"
                            />
                        </div>
                    ) :  (
                        <span className="student-infoRes">{`${studentData.firstName} ${studentData.lastName}`}</span>
                      )}
                </div>
                <div className="form-group">
                  <label>School:</label>
                  {isEditing ? (
                    <input
                      value={studentData.school}
                      onChange={(e) => handleChange('school',  e.target.value)}
                      className="student-input"
                    />
                  ) : (
                    <span className="student-infoRes">{studentData.school}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>Graduation:</label>
                  {isEditing ? (
                    <div className="graduation-inputs">
                      <select
                        value={studentData.gradSemester}
                        onChange={(e) => handleChange('gradSemester', e.target.value)}
                        className="student-input"
                      >
                        <option value="Spring">Spring</option>
                        <option value="Fall">Fall</option>
                        <option value="Summer">Summer</option>
                      </select>
                      <input
                        type="number"
                        value={studentData.gradYear}
                        onChange={(e) => handleChange('gradYear', parseInt(e.target.value) || 0)}
                        className="student-input"
                      />
                    </div>
                  ) : (
                    <span className="student-infoRes">{`${studentData.gradSemester} ${studentData.gradYear}`}</span>
                  )}
                </div>
      
                <div className="form-group">
                  <label>Bio:</label>
                  {isEditing ? (
                    <textarea
                      value={studentData.bio}
                      onChange={(e) => handleChange('bio', e.target.value)}
                      className="student-textarea"
                    />
                  ) : (
                    <span className="student-infoRes">{studentData.bio}</span>
                  )}
                </div>
      
                <div className="form-group">
                  <label>Email:</label>
                  {isEditing ? (
                    <input
                      value={studentData.email}
                      onChange={(e) => handleChange('email',  e.target.value)}
                      className="student-input"
                    />
                  ) : (
                    <span className="student-infoRes">{studentData.email}</span>
                  )}
                </div>

                <button 
                    onClick={isEditing ? onSave : onEditToggle}
                    className="student-button"
                >
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
            </div>
            <div className="right-space"></div>
        </div>
    );
};

export default StudentProfileView;