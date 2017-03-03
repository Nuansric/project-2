USE utilizedNeighbor_db;

DELIMITER $$

CREATE PROCEDURE getDistance( USERID INTEGER(10), LONGITUDE1 DECIMAL(11,8), LATITUDE1 DECIMAL(11,8), ServiceID INTEGER(11))

	BEGIN
	
	/*
	SELECT * FROM userProfiles
	WHERE calcDistance(LONGITUDE1 , LATITUDE1 , userProfiles.`longitude` , userProfiles.`latitude`) <= 5.0 
	AND userProfiles.`userId` != USERID;
	*/	

	-- SELECT 
	--  userProfiles.userId
	-- ,userProfiles.userName
	-- ,userProfiles.firstName
	-- ,userProfiles.phone
	-- ,userProfiles.email
	-- ,us.id as descriptionId
	-- ,us.description
	-- ,us.`discount`
	-- ,us.`serviceOfferServiceId`
	-- ,us.userProfileUserId
	-- ,so.`serviceName`
	--  FROM userProfiles
	-- INNER JOIN userServices us on us.`userProfileUserId` = userProfiles.`userId`
	-- INNER JOIN serviceOffers so on so.`serviceId` = us.`serviceOfferServiceId`
	-- WHERE calcDistance(LONGITUDE1 , LATITUDE1 , userProfiles.`longitude` , userProfiles.`latitude`) <= 5.0 
	-- AND userProfiles.`userId` != USERID
	-- AND us.`serviceOfferServiceId` = ServiceID;






	SELECT DISTINCT
	 userProfiles.userId
	,userProfiles.userName
	,userProfiles.firstName
	,userProfiles.phone
	,userProfiles.email
	,us.id as descriptionId
	,us.description
	,us.`discount`
	,us.`serviceOfferServiceId`
	,us.userProfileUserId
	,so.`serviceName`
	,( select 
			COUNT(*)
			from userRatings ur
			where ur.userServiceId = us.id
			AND ur.isLiked = 1

	) as likeCount 
	,( select 
			COUNT(*)
			from userRatings ur
			where ur.userServiceId = us.id
			AND ur.isLiked = 0 
			AND (TIMESTAMPDIFF(MINUTE,  CURRENT_TIMESTAMP , ur.updatedAt )  - 300) > 2880
	) as disLikeCount 
	 FROM userProfiles
	INNER JOIN userServices us on us.`userProfileUserId` = userProfiles.`userId`
	INNER JOIN serviceOffers so on so.`serviceId` = us.`serviceOfferServiceId`
	LEFT JOIN userRatings ur on ur.userServiceId = us.id
	WHERE calcDistance(LONGITUDE1 , LATITUDE1 , userProfiles.`longitude` , userProfiles.`latitude`) <= 5.0 
	AND userProfiles.`userId` != USERID 
	AND us.`serviceOfferServiceId` = ServiceID;






    END;