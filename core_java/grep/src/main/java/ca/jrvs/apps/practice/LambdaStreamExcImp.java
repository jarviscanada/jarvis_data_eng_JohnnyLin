package ca.jrvs.apps.practice;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;
import java.util.stream.Collectors;
import java.util.stream.DoubleStream;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class LambdaStreamExcImp implements LambdaStreamExc{

  public static void main(String[] args) {
    LambdaStreamExc lse = new LambdaStreamExcImp();

    System.out.println("TEST: createStrStream(String...)");
    Stream<String> t1 = lse.createStrStream("Hello", "Hi", "Hey");
    t1.forEach(System.out::println);

    System.out.println("TEST: toUpperCase(String...)");
    Stream<String> t2 = lse.toUpperCase("Hello", "Hi", "Hey");
    t2.forEach(System.out::println);

    System.out.println("TEST: filter(Stream<String>, String)");
    Stream<String> t3 = lse.filter(lse.createStrStream("Hello", "Hi", "Hey"), "el");
    t3.forEach(System.out::println);

    System.out.println("TEST: createIntStream(int[])");
    int[] intArr = {1, 2, 3, 7, 8, 13};
    IntStream t4 = lse.createIntStream(intArr);
    t4.boxed().forEach(System.out::println);

    System.out.println("TEST: toList(Stream<E>)");
    List<String> t5 = lse.toList(lse.createStrStream("Hello", "Hi", "Hey"));
    t5.stream().forEach(System.out::println);

    System.out.println("TEST: toList(IntStream)");
    List<Integer> t6 = lse.toList(lse.createIntStream(intArr));
    t6.stream().forEach(System.out::println);

    System.out.println("TEST: createIntStream(int, int)");
    IntStream t7 = lse.createIntStream(3, 10);
    t7.boxed().forEach(System.out::println);

    System.out.println("TEST: squareRootIntStream(IntStream)");
    DoubleStream t8 = lse.squareRootIntStream(lse.createIntStream(3, 10));
    t8.boxed().forEach(System.out::println);

    System.out.println("TEST: getOdd(IntStream)");
    IntStream t9 = lse.getOdd(lse.createIntStream(3, 10));
    t9.boxed().forEach(System.out::println);

    System.out.println("TEST: getLambdaPrinter(String, String)");
    Consumer<String> printer = lse.getLambdaPrinter("start>", "<end");
    printer.accept("Test");

    System.out.println("TEST: printMessages(String[], Consumer<String>)");
    String[] messages = {"a", "b", "c"};
    lse.printMessages(messages, lse.getLambdaPrinter("msg:", "!"));

    System.out.println("TEST: printOdd(IntStream, Consumer<String>)");
    lse.printOdd(lse.createIntStream(0, 5), lse.getLambdaPrinter("odd number:", "!"));

    System.out.println("TEST: flatNestedInt(Stream<List<Integer>>)");
    List<Integer> listInt = Arrays.asList(1, 3, 6, 7, 8);
    List<List<Integer>> nestedList = new ArrayList<List<Integer>>();
    nestedList.add(listInt);
    nestedList.add(listInt);
    nestedList.add(listInt);
    Stream<Integer> t13 = lse.flatNestedInt(nestedList.stream());
    t13.forEach(System.out::println);
  }

  @Override
  public Stream<String> createStrStream(String... strings) {
    return Stream.of(strings);
  }

  @Override
  public Stream<String> toUpperCase(String... strings) {
    return createStrStream(strings).map(s -> s.toUpperCase());
  }

  @Override
  public Stream<String> filter(Stream<String> stringStream, String pattern) {
    return stringStream.filter(s -> !s.contains(pattern));
  }

  @Override
  public IntStream createIntStream(int[] arr) {
    return Arrays.stream(arr);
  }

  @Override
  public <E> List<E> toList(Stream<E> stream) {
    return stream.collect(Collectors.toList());
  }

  @Override
  public List<Integer> toList(IntStream intStream) {
    return intStream.boxed().collect(Collectors.toList());
  }

  @Override
  public IntStream createIntStream(int start, int end) {
    return IntStream.range(start, end+1);
  }

  @Override
  public DoubleStream squareRootIntStream(IntStream intStream) {
    return intStream.asDoubleStream().map(Math::sqrt);
  }

  @Override
  public IntStream getOdd(IntStream intStream) {
    return intStream.filter(n -> n % 2 == 1);
  }

  @Override
  public Consumer<String> getLambdaPrinter(String prefix, String suffix) {
    return (msg -> System.out.println(prefix + msg + suffix));
  }

  @Override
  public void printMessages(String[] messages, Consumer<String> printer) {
    Arrays.stream(messages).forEach(printer::accept);
  }

  @Override
  public void printOdd(IntStream intStream, Consumer<String> printer) {
    getOdd(intStream).boxed().forEach(n -> printer.accept(String.valueOf(n)));
  }

  @Override
  public Stream<Integer> flatNestedInt(Stream<List<Integer>> ints) {
    return ints.flatMap(List::stream).map(n -> n*n);
  }
}
