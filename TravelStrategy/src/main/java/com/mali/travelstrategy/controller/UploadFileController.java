package com.mali.travelstrategy.controller;

import com.mali.travelstrategy.annotation.PassTokenRequired;
import com.mali.travelstrategy.config.ServerConfig;
import com.mali.travelstrategy.entity.ApiResult;
import com.mali.travelstrategy.enums.HttpCodeEnum;
import org.apache.commons.lang3.StringUtils;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.UUID;

/**
 * 文件上传 控制器
 * @author By-mali
 */
@RestController
public class UploadFileController {
    @Autowired
    ServerConfig serverConfig;

    @Value("${spring.servlet.multipart.location}")
    private String fileTempPath;

    @Value("${server.servlet.context-path}")
    private String contextPath;

//    @Value("${server.servlet.context-path}")
//    private String contextPath;
//
//    @Value("${travel.path.upload}")
//    private String uploadPath;

    @PassTokenRequired
    @PostMapping(path = {"/app/upload","/admin/upload"})
    public ApiResult upload(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
//        if (file.isEmpty()) {
//            return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(), "参数异常");
//        }
//        // 获取原始文件名
//        String fileName = file.getOriginalFilename();
//        // 获取原始的文件类型
//        String suffixName = fileName.substring(fileName.lastIndexOf("."));
//        // 生成随机文件名
//        fileName = UUID.randomUUID() + suffixName;
//        // 确认存放路径
//        File dest = new File( uploadPath + "/" + fileName);
//        if(!dest.getParentFile().exists()){
//            dest.getParentFile().mkdirs();
//        }
//        try {
//            file.transferTo(dest);
//        } catch (IOException e) {
//            return new ApiResult(HttpCodeEnum.ERROR.getCode(), "上传失败");
//        }
//        String userHeaderUrl = contextPath + "/upload/tmp/" + fileName;
//        HashMap<String, Object> fileInfo = new HashMap<>(16);
//        fileInfo.put("fileName",fileName);
//        fileInfo.put("filePath",dest);
//        return new ApiResult(HttpCodeEnum.SUCCESS.getCode(), "文件上传成功", fileInfo);

        if (file.isEmpty()) {
            return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(), "参数异常");
        }
        String fileName = file.getOriginalFilename();
        String rawFileName = StringUtils.substringBefore(fileName, ".");
        String fileType = StringUtils.substringAfter(fileName, ".");
        String newFileName = System.currentTimeMillis() + "." + fileType;
        String localFilePath = StringUtils.appendIfMissing(fileTempPath, "/") + newFileName;
        String serverUrl = serverConfig.getUrl();
        String serverFilePath = serverUrl + contextPath +"/" + newFileName;
        System.out.println(serverUrl);
//        String localFilePath = StringUtils.appendIfMissing(serverUrl, "/") + System.currentTimeMillis() + "." + fileType;

        File destFile = new File(localFilePath);
        if(!destFile.getParentFile().exists()){
            destFile.getParentFile().mkdirs();
        }
        try {
            FileUtils.copyInputStreamToFile(file.getInputStream(), destFile);
        } catch (IOException e) {
            return new ApiResult(HttpCodeEnum.ERROR.getCode(), "文件上传失败");
        }
        HashMap<String, Object> fileInfo = new HashMap<>(16);
        fileInfo.put("fileName",fileName);
        fileInfo.put("filePath",serverFilePath);
        System.out.println(serverFilePath);
        return new ApiResult(HttpCodeEnum.SUCCESS.getCode(), "文件上传成功", fileInfo);
    }

}
