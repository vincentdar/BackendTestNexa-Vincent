CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `gmedia_democase2`@`%.%.%.%` 
    SQL SECURITY DEFINER
VIEW `gmedia_democase`.`karyawan_vincent` AS
    SELECT 
        `gmedia_democase`.`karyawan`.`nip` AS `nip`,
        `gmedia_democase`.`karyawan`.`nama` AS `nama`,
        `gmedia_democase`.`karyawan`.`alamat` AS `alamat`,
        CASE
            WHEN `gmedia_democase`.`karyawan`.`gend` = 'L' THEN 'Laki-laki'
            WHEN `gmedia_democase`.`karyawan`.`gend` = 'P' THEN 'Perempuan'
        END AS `gender`,
        DATE_FORMAT(`gmedia_democase`.`karyawan`.`tgl_lahir`,
                '%d %M %Y') AS `Tanggal Lahir`
    FROM
        `gmedia_democase`.`karyawan`