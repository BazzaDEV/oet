public enum Argument {

    SKIP_LAUNCHER ("--skipLauncher");

    private final String arg;
    Argument(String arg) {
        this.arg = arg;
    }

    public String getArg() {
        return arg;
    }

    public static Argument fromArgument(String s) {
        for (Argument a : values()) {
            if (a.getArg().equalsIgnoreCase(s))
                return Argument.valueOf(String.valueOf(a));
        }

        return null;
    }


}
