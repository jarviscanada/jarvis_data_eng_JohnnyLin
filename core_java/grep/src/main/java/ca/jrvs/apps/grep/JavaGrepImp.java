package ca.jrvs.apps.grep;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.log4j.BasicConfigurator;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class JavaGrepImp implements JavaGrep{

  final Logger logger = LoggerFactory.getLogger(JavaGrep.class);

  private String regex;
  private String rootPath;
  private String outFile;

  public static void main(String[] args) {
    if (args.length != 3) {
      throw new IllegalArgumentException("USAGE: JavaGrep regex rootPath outFile");
    }

    //Use default logger config
    BasicConfigurator.configure();

    JavaGrepImp javaGrepImp = new JavaGrepImp();
    javaGrepImp.setRegex(args[0]);
    javaGrepImp.setRootPath(args[1]);
    javaGrepImp.setOutFile(args[2]);

    try {
      javaGrepImp.process();
    } catch (IOException e) {
      javaGrepImp.logger.error("Error: Unable to process", e);
    }
  }

  @Override
  public void process() throws IOException {
    List<String> matchedLines = new ArrayList<String>();

    List<File> files = listFiles(rootPath);
    for (File file : files) {
      List<String> lines = readLines(file);
      for (String line : lines) {
        if (containsPattern(line)) {
          matchedLines.add(line);
        }
      }
    }

    writeToFile(matchedLines);
  }

  @Override
  public List<File> listFiles(String rootDir) {
    File root = new File(rootDir);
    List<File> files = new ArrayList<File>();
    File[] rootFilesList = root.listFiles();
    if (rootFilesList != null) {
      for (File file : rootFilesList) {
        if (file.isFile()) {
          files.add(file);
        } else if (file.isDirectory()) {
          files.addAll(listFiles(file.getAbsolutePath()));
        }
      }
    }
    return files;
  }

  @Override
  public List<String> readLines(File inputFile) {
    List<String> lines = new ArrayList<String>();

    try (BufferedReader in = new BufferedReader(new FileReader(inputFile))) {
      String line = in.readLine();
      while (line != null) {
        lines.add(line);
        line = in.readLine();
      }
    } catch (IOException e) {
      logger.error("Error: Unable to read lines", e);
    }
    return lines;
  }

  @Override
  public boolean containsPattern(String line) {
    return line.matches(regex);
  }

  @Override
  public void writeToFile(List<String> lines) throws IOException {
    BufferedWriter out= new BufferedWriter(new FileWriter(outFile));
    for (String line : lines) {
      out.write(line + "\n");
    }

    out.close();
  }

  @Override
  public String getRootPath() {
    return rootPath;
  }

  @Override
  public void setRootPath(String rootPath) {
    this.rootPath = rootPath;
  }

  @Override
  public String getRegex() {
    return regex;
  }

  @Override
  public void setRegex(String regex) {
    this.regex = regex;
  }

  @Override
  public String getOutFile() {
    return outFile;
  }

  @Override
  public void setOutFile(String outFile) {
    this.outFile = outFile;
  }
}