USE utilizedNeighbor_db;

DELIMITER $$

CREATE PROCEDURE getDistance( USERID INTEGER(10), LONGITUDE1 DECIMAL(11,8), LATITUDE1 DECIMAL(11,8))

	BEGIN
	
	SELECT * FROM userProfile
	WHERE calcDistance(LONGITUDE1 , LATITUDE1 , userProfile.`longitude` , userProfile.`latitude`) <= 5.0 
	AND userProfile.`userId` != USERID;
		
    END;