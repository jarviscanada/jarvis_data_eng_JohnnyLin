package ca.jrvs.apps.grep;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.apache.log4j.BasicConfigurator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JavaGrepLambdaImp extends JavaGrepImp {
  public static void main(String[] args) {
    if (args.length != 3) {
      throw new IllegalArgumentException("USAGE: JavaGrep regex rootPath outFile");
    }

    //Use default logger config
    BasicConfigurator.configure();

    //creating JavaGrepLambdaImp instead of JavaGrepImp
    //JavaGrepLambdaImp inherits all methods except two override methods
    JavaGrepLambdaImp javaGrepLambdaImp = new JavaGrepLambdaImp();
    javaGrepLambdaImp.setRegex(args[0]);
    javaGrepLambdaImp.setRootPath(args[1]);
    javaGrepLambdaImp.setOutFile(args[2]);

    try {
      javaGrepLambdaImp.process();
    } catch (IOException e) {
      javaGrepLambdaImp.logger.error("Error: Unable to process", e);
    }
  }

  @Override
  public List<File> listFiles(String rootDir) {
    File root = new File(rootDir);
    List<File> files = new ArrayList<File>();
    File[] rootFilesList = root.listFiles();
    if (rootFilesList != null) {
      files.addAll(Arrays.stream(rootFilesList).filter(file -> file.isFile()).collect(Collectors.toList()));
      Arrays.stream(rootFilesList).filter(file -> file.isDirectory()).forEach(file -> files.addAll(listFiles(file.getAbsolutePath())));
    }
    return files;
  }

  @Override
  public List<String> readLines(File inputFile) {
    List<String> lines = null;

    try (BufferedReader in = new BufferedReader(new FileReader(inputFile))) {
      lines = in.lines().collect(Collectors.toList());
    } catch (IOException e) {
      logger.error("Error: Unable to read lines", e);
    }
    return lines;
  }
}