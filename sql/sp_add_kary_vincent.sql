CREATE DEFINER=`gmedia_democase2`@`%.%.%.%` PROCEDURE `sp_add_kary_vincent`(	
    IN user_id int(11),
    IN nama varchar(200),
    IN alamat varchar(200),
    IN gend enum('L','P'),
    IN photo text,
    IN tgl_lahir date,    
    IN uploader varchar(200),
    IN insert_at date
)
BEGIN
	DECLARE nip_lama numeric;
    DECLARE nip_baru numeric;  
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	  BEGIN
			ROLLBACK;		
			GET DIAGNOSTICS CONDITION 1  
			@err_no = MYSQL_ERRNO,  
			@errmsg = MESSAGE_TEXT;
			INSERT INTO log_trx_api (user_id, api,request,response) VALUES (user_id, "sp_add_kary_vincent",CONCAT('","nama":"',nama,'","alamat":"',alamat,'","gend":"',gend,'","tgl_lahir":"',tgl_lahir,'","uploader":"',uploader,'"}'), @errmsg);
	  END;
      
	  
	START TRANSACTION;
SELECT 
    RIGHT(MAX(nip), 4)
INTO nip_lama FROM
    gmedia_democase.karyawan
WHERE
    LEFT(nip, 4) = YEAR(CURDATE());    
    SET nip_baru = nip_lama + 1;    
    INSERT INTO karyawan VALUES (CONCAT(YEAR(curdate()), nip_baru), nama, alamat, gend, photo, tgl_lahir, 1, insert_at, uploader, insert_at, uploader);        
    INSERT INTO log_trx_api (user_id, api,request,response) VALUES (user_id, "sp_add_kary_danny",CONCAT('{"nip":"',CONCAT(YEAR(curdate()), nip_baru),'","nama":"',nama,'","alamat":"',alamat,'","gend":"',gend,'","tgl_lahir":"',tgl_lahir,'","uploader":"',uploader,'"}'), "Data karyawan berhasil dibuat.");
    COMMIT;
END