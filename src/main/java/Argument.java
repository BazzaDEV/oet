public enum Argument {

    NO_GUI("--nogui");

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
