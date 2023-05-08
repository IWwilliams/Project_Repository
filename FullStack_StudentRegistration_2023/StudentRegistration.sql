DROP DATABASE IF EXISTS STUDENTREGISTRATION;
CREATE DATABASE STUDENTREGISTRATION; 
USE STUDENTREGISTRATION;

DROP TABLE IF EXISTS COURSE;
CREATE TABLE COURSE (
	CourseID				varchar(30)	not null,
	CourseName				varchar(10)	not null,
	CourseNumber			varchar(10)	not null,
	primary key (CourseID)
);

INSERT INTO COURSE (CourseID, CourseName, CourseNumber)
VALUES
('ENSF614','ENSF','614'),
('ENSF607','ENSF','607'),
('ENSF608','ENSF','608');

DROP TABLE IF EXISTS PREREQS;
CREATE TABLE PREREQS (
	PrereqID			varchar(30)	not null,
	CourseID			varchar(30) not null,
	primary key (PrereqID),
	foreign key (CourseID) references COURSE(CourseID)    
);

INSERT INTO PREREQS (PrereqID, CourseID)
VALUES
('ENSF592','ENSF614'),
('ENSF593','ENSF607'),
('ENSF594','ENSF608');

DROP TABLE IF EXISTS SECTION;
CREATE TABLE SECTION (
	SectionID				varchar(41)	not null,
	CourseID				varchar(30)	not null,
	SectionNum				varchar(10)	not null,
    primary key (SectionID),
	foreign key (CourseID) references COURSE(CourseID)
);

INSERT INTO SECTION (SectionID, CourseID, SectionNum)
VALUES
('ENSF614-01','ENSF614','01'),
('ENSF614-02','ENSF614','02'),
('ENSF608-01','ENSF608','01'),
('ENSF608-02','ENSF608','02');

DROP TABLE IF EXISTS STUDENT;
CREATE TABLE STUDENT (
	StudentID				varchar(30)	not null,
	LName					varchar(25) not null,
	FName					varchar(25) not null,
    primary key (StudentID)
);

INSERT INTO STUDENT (StudentID, FName, LName)
VALUES
('10437965','Isaiah', 'Williams'),
('10426938','Kimberly', 'Baldwin'),
('10453496','Braydon', 'Hart'),
('99','Wayne', 'Gretzky');

DROP TABLE IF EXISTS REGISTRATION;
CREATE TABLE REGISTRATION (
	CourseID				varchar(30)	not null,
	StudentID				varchar(30)	not null,
	SectionID				varchar(41) not null,
	Grade					varchar(1),
    foreign key (CourseID) references COURSE(CourseID),
    foreign key (StudentID) references STUDENT(StudentID),
    foreign key (SectionID) references SECTION(SectionID)
);

INSERT INTO REGISRATION (CourseID, StudentID, SectionID, Grade)
VALUES
('ENSF614','10437965', 'ENSF614-01', 'A'),
('ENSF614','10426938', 'ENSF614-01'),
('ENSF614','10453496', 'ENSF614-01', 'A'),
('ENSF614','99', 'ENSF614-01', 'A');

